import {nanoid} from 'nanoid'
import store, { RootState } from '@/store';

import { ViewProps } from "./types";
import { connect } from '@/store/utils/connect';

export default abstract class DisplayObject {
  x?: number
  y?: number
  width?: number
  height?: number

  id: string

  children: Map<string, DisplayObject>

  ctx: CanvasRenderingContext2D

  unsubscribe?: () => void

  constructor(viewProps: ViewProps) {
    this.x = viewProps.x || 0;
    this.y = viewProps.y || 0;
    this.width = viewProps.width;
    this.height = viewProps.height;

    this.children = new Map();

    this.id = nanoid();

    this.ctx = null;
  }

  abstract draw(ctx: CanvasRenderingContext2D): void

  abstract onCreate(store: RootState): void 

  abstract onUpdate(update: any): void

  abstract onUnMount(): void

  mount<T>(child: DisplayObject, getter?: (state: RootState) => T) {
    if (this.children.has(child.id)) return;

    this.children.set(child.id, child);

    child.onCreate && child.onCreate(store.getState());

    if (getter) {
      connect(child, getter)
    }
  }

  unMount(child: DisplayObject) {
    this.children.delete(child.id);

    child.onUnMount();
  }

  update<T extends ViewProps>(props: Partial<T>) {
    Object.entries(props).forEach(([key, value]) => {
      this[key] = value
    });
  }
}