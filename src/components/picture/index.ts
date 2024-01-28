import { isObject } from "lodash";

import DisplayObject from "../display-object";
import { Scale } from "../display-object/types";

import { PictureProps } from "./types";

export default class Picture extends DisplayObject {
  src: string
  scale: Scale
  imageLoaded: boolean
  image: HTMLImageElement
  anchor: [number, number]

  constructor(viewProps: PictureProps) {
    super(viewProps);

    this.imageLoaded = false;

    this.image = new Image();

    this.src = viewProps.src

    this.scale = isObject(viewProps.scale) ? viewProps.scale : { x: 1, y: 1 }

    this.anchor = viewProps.anchor || [0.5, 0.5];
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.imageLoaded) return;

    ctx.drawImage(
      this.image,
      this.x - (this.width * this.anchor[0] * this.scale.x),
      this.y - (this.height * this.anchor[1] * this.scale.y),
      this.width * this.scale.x,
      this.height * this.scale.y,
    );
  }

  onCreate(): void {
    this.image.src = this.src;

    this.image.onload = () => {
      
      this.imageLoaded = true;
      this.width = this.width || this.image.width;
      this.height = this.height || this.image.height;
    }
  }

  updateSrc(src: string, onload?: () => void) {
    this.src = src

    this.image = new Image();

    this.image.src = this.src;
    
    this.imageLoaded = false;
    
    this.image.onload = () => {
      this.imageLoaded = true;
      this.width = this.image.width;
      this.height = this.image.height;

      onload && onload()
    }
  }

  onUpdate(): void {

  }

  onUnMount(): void {

  }
}