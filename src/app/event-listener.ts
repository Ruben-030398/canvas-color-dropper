import { DisplayObject } from "@/components";
import { RootObject } from "./types";
import { DisplayObjectEvent } from "@/components/display-object/types";

class EventListener {
  listeners: Map<DisplayObjectEvent, (event: PointerEvent) => void>;
  pointerInObjects: Set<string>

  constructor() {
    this.listeners = new Map();
    this.pointerInObjects = new Set();
  }

  removeListeners(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;

    this.listeners.forEach((listener, key) => {
      canvas.removeEventListener(key, listener)
    })

    this.listeners.clear();
    this.pointerInObjects.clear();
  }

  setupListeners(rootObject: RootObject, events: Array<DisplayObjectEvent>, ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;

    events.forEach(event => {
      switch (event) {
        case "pointerdown":
          const onPointerDown = this.createListener('pointerdown', rootObject);
          canvas.addEventListener('pointerdown', onPointerDown);
          this.listeners.set('pointerdown', onPointerDown)
          break;
        case "pointerup":
          const onPointerUp = this.createListener('pointerup', rootObject);
          canvas.addEventListener('pointerup', onPointerUp);
          this.listeners.set('pointerup', onPointerUp)
          break;
        case "pointermove":
          const onPointerMove = this.createListener('pointermove', rootObject);
          canvas.addEventListener('pointermove', onPointerMove);
          this.listeners.set('pointermove', onPointerMove)
          break;
        case "pointerout":
          const onPointerOut = this.createListener('pointerout', rootObject);
          canvas.addEventListener('pointermove', onPointerOut);
          this.listeners.set('pointerout', onPointerOut)
          break;
      }
    })
  }

  checkCollision(object: DisplayObject, rootObject: RootObject, event: PointerEvent) {
    const canvas = rootObject.ctx?.canvas;

    if (!canvas) return;

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

  createListener(eventType: DisplayObjectEvent, rootObject: RootObject) {

    switch (eventType) {
      case 'pointerout':
        return (event: PointerEvent) => {
          const objectsStack = [...Array.from(rootObject.children.values())];

          while (objectsStack.length) {
            const node = objectsStack.pop();

            if (!node) return;

            if (node.interactive) {
              const listener = node.listeners.get(eventType);

              if (listener && !this.checkCollision(node, rootObject, event) && this.pointerInObjects.has(node.id)) {
                listener && listener(event)
                this.pointerInObjects.delete(node.id);
                return;
              }
            }

            node.children.size && objectsStack.push(...Array.from(node.children.values()))
          }
        }
        case 'pointermove':
          return (event: PointerEvent) => {
            const objectsStack = [...Array.from(rootObject.children.values())];
  
            while (objectsStack.length) {
              const node = objectsStack.pop();
  
              if (!node) return;
  
              if (node.interactive) {
                const listener = node.listeners.get(eventType);
  
                if (listener && this.checkCollision(node, rootObject, event)) {
                  listener && listener(event)
                  this.pointerInObjects.add(node.id);
                  return;
                }
              }
  
              node.children.size && objectsStack.push(...Array.from(node.children.values()))
            }
          }
      default:
        return (event: PointerEvent) => {

          const objectsStack = [...Array.from(rootObject.children.values())];

          while (objectsStack.length) {
            const node = objectsStack.pop();

            if (!node) return;

            if (node.interactive) {
              const listener = node.listeners.get(eventType);

              if (listener && this.checkCollision(node, rootObject, event)) {
                listener && listener(event)

                return;
              }
            }

            node.children.size && objectsStack.push(...Array.from(node.children.values()))
          }
        }
    }

  }
}

export default EventListener