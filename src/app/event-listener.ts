import { DisplayObject } from "@/components";
import { RootObject } from "./types";
import { DisplayObjectEvent } from "@/components/display-object/types";

class EventListener {
  listeners: Map<DisplayObjectEvent, (event: PointerEvent) => void>;

  constructor() {
    this.listeners = new Map();
  }

  removeListeners(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;

    this.listeners.forEach((listener, key) => {
      canvas.removeEventListener(key, listener)
    })

    this.listeners.clear();
  }

  setupListeners(rootObject: RootObject, events: Array<DisplayObjectEvent>, ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;

    events.forEach(event => {
      switch (event) {
        case "pointerdown":          
          const onPointerDown = this.createListener('pointerdown', rootObject).bind(this);
          canvas.addEventListener('pointerdown', onPointerDown);
          this.listeners.set('pointerdown', onPointerDown)
          break;
        case "pointerup":
          const onPointerUp = this.createListener('pointerup', rootObject).bind(this);
          canvas.addEventListener('pointerup', onPointerUp);
          this.listeners.set('pointerup', onPointerUp)
          break;
        case "pointerover":
          const onPointerOver = this.createListener('pointerover', rootObject).bind(this);
          canvas.addEventListener('pointerover', onPointerOver);
          this.listeners.set('pointerover', onPointerOver)
          break;
        case "pointermove":
          const onPointerMove = this.createListener('pointermove', rootObject).bind(this);
          canvas.addEventListener('pointermove', onPointerMove);
          this.listeners.set('pointermove', onPointerMove)
          break;
      }
    })
  }

  checkCollision(object: DisplayObject, rootObject: RootObject, event: PointerEvent) {
    const canvas = rootObject.ctx.canvas;

    const boundingRect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - boundingRect.left;
    const mouseY = event.clientY - boundingRect.top;

    let isInsideObjectArea = false;

    switch (object.form) {
      case "rect":
        isInsideObjectArea =
          mouseX >= object.x - object.width / 2 &&
          mouseX <= object.x + object.width / 2 &&
          mouseY >= object.y - object.height / 2 &&
          mouseY <= object.y + object.height / 2;
        break;
      case "circle":
        const distanceToCenter = Math.sqrt((mouseX - object.x) ** 2 + (mouseY - object.y) ** 2);
        isInsideObjectArea = distanceToCenter <= object.width / 2;
        break;
    }

    return isInsideObjectArea;
  }

  createListener(eventType: DisplayObjectEvent, rootObject: RootObject,) {

    return function (event: PointerEvent) {

      const objectsStack = [...Array.from(rootObject.children.values())];
      
      while (objectsStack.length) {
        const node = objectsStack.shift();

        if (node.interactive) {
          const listener = node.listeners.get(eventType);

          if (listener && this.checkCollision(node, rootObject, event)) {
            listener && listener(event)

            return;
          }
        }

        node.children.size && objectsStack.unshift(...Array.from(node.children.values()))
      }
    }

  }
}

export default EventListener