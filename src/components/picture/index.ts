import DisplayObject from "../display-object";

import { PictureProps } from "./types";

export default class Picture extends DisplayObject {
  src: string
  imageLoaded: boolean
  image: HTMLImageElement
  anchor: [number, number]

  constructor(viewProps: PictureProps) {
    super(viewProps);

    this.imageLoaded = false;

    this.image = new Image();

    this.image.setAttribute('crossOrigin', '');

    this.src = viewProps.src

    this.anchor = viewProps.anchor || [0.5, 0.5];
  }

  draw(ctx: CanvasRenderingContext2D) {
    if (!this.imageLoaded) return;

    ctx.drawImage(
      this.image,
      this.x - (this.width * this.anchor[0] * this.scaleX),
      this.y - (this.height * this.anchor[1] * this.scaleY),
      this.width * this.scaleX,
      this.height * this.scaleY,
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

    this.image.setAttribute('crossOrigin', '');

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