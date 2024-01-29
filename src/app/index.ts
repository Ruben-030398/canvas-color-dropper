import DisplayObject from "@/components/display-object";
import { ViewProps } from "@/components/display-object/types";

import EventListener from './event-listener';
import store from "@/store";
import { setImageInfo } from "@/modules/image-container/store/actions";

class App extends DisplayObject {
  container!: HTMLElement;
  canvas!: HTMLCanvasElement;
  ctx!: CanvasRenderingContext2D | null;
  children: Map<string, DisplayObject>;
  animationId: number | null;
  initialized: boolean;
  eventListener: EventListener

  constructor(props: ViewProps) {
    super(props)
    this.initialized = false;

    this.animationId = null;

    this.children = new Map();

    this.eventListener = new EventListener();

    this.renderable = true // this becomes true only after IMAGE_UPLOADED action fired 
  }

  init() {
    this.canvas = document.createElement('canvas');

    this.canvas.id = 'canvas';

    this.ctx = this.canvas.getContext("2d");

    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.canvas.style.position = 'absolute';
    this.canvas.style.top = '0px'; 

    this.container = document.getElementById("container") || document.body;

    this.container.appendChild(this.canvas);

    this.initialized = true;
  }

  #onResize() {    
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight; 
  } 

  #render() {
    this.ctx?.clearRect(0, 0, this.canvas.width , this.canvas.height);

    this.animationId = requestAnimationFrame(this.#render.bind(this)); 
    
    if (!this.renderable) return;
    
    const renderStack = [...Array.from(this.children.values())];

    while(renderStack.length) {
      const node = renderStack.shift();

      if(!node || !node.renderable) continue;

      node.draw && node.draw(this?.ctx);

      node.children.size && renderStack.unshift(...Array.from(node.children.values()))
    }
  
  }

  draw() {
    this.stop();

    this.ctx && this.eventListener.setupListeners(this, ['pointerdown', 'pointerout', 'pointerup', 'pointermove'], this.ctx)    

    window.addEventListener('resize', this.#onResize.bind(this))

    this.#render();

    store.dispatch(setImageInfo({ name: '', src: 'https://i.ytimg.com/vi/00xjZxL8ypM/maxresdefault.jpg' }))
  }

  stop() {
    this.animationId && cancelAnimationFrame(this.animationId)
  }

  onCreate(): void {
    
  }

  onUpdate(): void {
    
  }

  onUnMount(): void {
    this.ctx && this.eventListener.removeListeners(this.ctx)
  }
}

export default new App({ x: 0, y: 0 });