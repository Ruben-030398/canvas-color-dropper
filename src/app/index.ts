import DisplayObject from "@/components/display-object";
import { ViewProps } from "@/components/display-object/types";

import { RootState } from "@/store";

import { config } from './config';

import EventListener from './event-listener';

class App extends DisplayObject {
  container: HTMLElement;
  canvas: HTMLCanvasElement;isInsideButton
  ctx: CanvasRenderingContext2D;
  children: Map<string, DisplayObject>;
  animationId: number | null;
  initialized: boolean;
  eventListener: EventListener

  constructor(props: ViewProps) {
    super(props)
    this.initialized = false;

    this.children = new Map();

    this.animationId = null;

    this.eventListener = new EventListener()
  }

  init() {
    this.canvas = document.createElement('canvas');

    this.canvas.id = 'canvas';

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
      const node = renderStack.shift();

      node.draw && node.draw(this.ctx);

      node.children.size && renderStack.unshift(...Array.from(node.children.values()))
    }
  
  }

  draw() {
    this.stop();

    this.eventListener.setupListeners(this, ['pointerdown', 'pointerover', 'pointerup', 'pointermove'], this.ctx)

    this.#render();
  }

  stop() {
    this.animationId && cancelAnimationFrame(this.animationId)
  }

  onCreate(store: RootState): void {
    
  }

  onUpdate(): void {
    
  }

  onUnMount(): void {
    this.eventListener.removeListeners(this.ctx)
  }
}

export default new App({ x: 0, y: 0 });