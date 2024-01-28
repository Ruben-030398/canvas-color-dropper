import {nanoid} from 'nanoid'
import store, { RootState } from '@/store';

import { DisplayObjectEvent, DisplayObjectForm, Scale, ViewProps } from "./types";
import { connect } from '@/store/utils/connect';

export default abstract class DisplayObject {
  x: number
  y: number
  width: number
  height: number
  interactive: boolean
  id: string
  children: Map<string, DisplayObject>
  unsubscribe?: () => void
  listeners: Map<DisplayObjectEvent, (event: Event) => void>
  form: DisplayObjectForm
  scale: Scale| number

  constructor(viewProps: ViewProps) {
    this.x = viewProps.x || 0;
    this.y = viewProps.y || 0;
    this.width = viewProps.width || 1;
    this.height = viewProps.height || 1;

    this.children = new Map();

    this.listeners = new Map();

    this.interactive = viewProps.interactive || false;

    this.form = viewProps.form || 'rect';

    this.scale = viewProps.scale || { x:1, y: 1 };

    this.id = nanoid();
  }

  on(event: DisplayObjectEvent, cb: (event: Event) => void){
    this.listeners.set(event, cb)
  }

  mount<T>(child: DisplayObject, getter?: (state: RootState) => T) {
    if (this.children.has(child.id)) return;

    this.children.set(child.id, child);

    console.log(child.onCreate)

    child.onCreate && child.onCreate(store.getState());

    if (getter) {
      connect(child, getter)
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