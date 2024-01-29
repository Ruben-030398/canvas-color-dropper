import { nanoid } from 'nanoid'
import store, { RootState } from '@/store';

import { DisplayObjectEvent, DisplayObjectForm, Scale, ViewProps } from "./types";
import { connect } from '@/store/utils/connect';

export default abstract class DisplayObject {
  x: number
  y: number
  id: string
  width: number
  height: number
  interactive: boolean
  scale: Scale | number
  form: DisplayObjectForm
  unsubscribe?: () => void
  children: Map<string, DisplayObject>
  listeners: Map<DisplayObjectEvent, (event: PointerEvent) => void>
  renderable: boolean

  constructor(viewProps: ViewProps) {
    this.renderable = viewProps.renderable || true;

    this.x = viewProps.x || 0;
    this.y = viewProps.y || 0;
    this.width = viewProps.width || 0;
    this.height = viewProps.height || 0;

    this.children = new Map();

    this.listeners = new Map();

    this.interactive = viewProps.interactive || false;

    this.form = viewProps.form || 'rect';

    this.scale = viewProps.scale || { x: 1, y: 1 };

    this.id = nanoid();
  }

  on(event: DisplayObjectEvent, cb: (event: PointerEvent) => void) {
    this.listeners.set(event, cb)
  }

  mount<T>(child: DisplayObject, getter?: (state: RootState) => T) {
    if (this.children.has(child.id)) return;

    this.children.set(child.id, child);

    child.onCreate && child.onCreate(store.getState());    

    if (getter) {
      connect(child, getter)()
    }
  }

  unMount(child: DisplayObject) {
    this.children.delete(child.id);

    child.unsubscribe && child.unsubscribe();

    child.onUnMount();
  }

  update<T extends ViewProps>(props: Partial<T>) {
    Object.entries(props).forEach(([key, value]) => {
      this[key as keyof typeof this] = value
    });
  }

  abstract draw(ctx: CanvasRenderingContext2D | null): void

  abstract onCreate(store: RootState): void

  abstract onUpdate(update: any): void

  abstract onUnMount(): void
}