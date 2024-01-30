import { nanoid } from 'nanoid'
import { isBoolean, isNumber } from 'lodash';

import store, { RootState } from '@/store';
import { connect } from '@/store/utils/connect';

import { DisplayObjectEvent, DisplayObjectForm, ViewProps } from "./types";

export default abstract class DisplayObject {
  id: string
  _x: number
  _y: number
  width: number
  height: number
  _scaleX: number
  _scaleY: number
  renderable: boolean
  interactive: boolean
  form: DisplayObjectForm
  unsubscribe?: () => void
  parent: null | DisplayObject
  children: Map<string, DisplayObject>
  listeners: Map<DisplayObjectEvent, (event: PointerEvent) => void>

  constructor(viewProps: ViewProps) {
    this.renderable = isBoolean(viewProps.renderable) ? viewProps.renderable : true;

    this._x = viewProps.x || 0;
    this._y = viewProps.y || 0;
    this.width = viewProps.width || 0;
    this.height = viewProps.height || 0;

    this.children = new Map();

    this.listeners = new Map();

    this.interactive = viewProps.interactive || false;

    this.form = viewProps.form || 'rect';

    this._scaleX = viewProps.scale?.x || 1;
    this._scaleY = viewProps.scale?.y || 1;

    this.id = nanoid();
  }

  get x() {
    return (this.parent?.x || 0) + this._x
  }

  set x(value: number) {
    this._x = value
  }

  get y() {
    return (this.parent?.y || 0) + this._y
  }

  set y(value: number) {
    this._y = value
  }

  get scaleX(): number {
    return isNumber(this.parent?.scaleX) ? (this.parent.scaleX * this._scaleX) : this._scaleX
  }

  set scaleX(value: number) {
    this._scaleX = value;
  }

  get scaleY(): number {
    return isNumber(this.parent?.scaleY) ? (this.parent.scaleY * this._scaleY) : this._scaleY
  }

  set scaleY(value: number) {
    this._scaleY = value;
  }


  on(event: DisplayObjectEvent, cb: (event: PointerEvent) => void) {
    this.listeners.set(event, cb)
  }

  mount<T>(child: DisplayObject, getter?: (state: RootState) => T) {
    if (this.children.has(child.id)) return;

    this.children.set(child.id, child);

    child.onCreate && child.onCreate(store.getState());

    child.parent = this;

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