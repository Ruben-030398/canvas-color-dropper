import DisplayObject from "@/components/display-object";

import store, { RootState } from "@/store";

import { connect } from "@/store/utils/connect";

import { config } from './config';

class App {
  container: HTMLElement;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  children: Map<string, DisplayObject>;
  animationId: number | null;
  initialized: boolean;

  constructor() {
    this.initialized = false;

    this.children = new Map();

    this.animationId = null;
  }

  init() {
    this.canvas = document.createElement('canvas');

    this.ctx = this.canvas.getContext("2d");

    this.container = document.getElementById("container") || document.body;

    this.canvas.width = config.origWidth;
    this.canvas.height = config.origHeight;
    this.canvas.style.background = config.backgroundColor;

    this.container.appendChild(this.canvas);

    this.initialized = true;
  }

  #render() {
    this.ctx.clearRect(0, 0, this.canvas.width , this.canvas.height);

    this.animationId = requestAnimationFrame(this.#render.bind(this));   
    
    const renderStack = [...Array.from(this.children.values())];

    while(renderStack.length) {
      const node = renderStack.pop();

      node.draw && node.draw(this.ctx);

      node.children.size && renderStack.push(...Array.from(node.children.values()))
    }
  }

  start() {
    this.stop();

    this.#render();
  }

  stop() {
    this.animationId && cancelAnimationFrame(this.animationId)
  }

  mount<T>(object: DisplayObject, getter?: (state: RootState) => T,) {
    if (this.children.has(object.id)) return;

    object.onCreate && object.onCreate(store.getState());

    this.children.set(object.id, object);

    if (getter) {
      connect(object, getter)
    }
  }

  unMount(object: DisplayObject) {
    this.children.delete(object.id);

    object.unsubscribe && object.unsubscribe();
  }
}

export default new App();