import gsap from 'gsap';

import DisplayObject from '../display-object';
import Typography from '../typography';
import Picture from '../picture';

import { TypographyProps } from '../typography/types';
import { PictureProps } from '../picture/types';

import { ButtonProps } from './types';

export default class Button extends DisplayObject {
  color: string;
  text?: string
  backgroundSrc?: string
  borderRadius?: Array<number> | number 
  children: Map<string, Picture | Typography>
  textProps?: Partial<TypographyProps>
  backgroundProps?: Partial<PictureProps>
  borderColor?: string;
  onClick?: () => void

  constructor(viewProps: ButtonProps) {
    super(viewProps);
    this.text = viewProps.text;

    this.color = viewProps.color || 'transparent';

    this.borderColor = viewProps.borderColor || this.color;

    this.backgroundSrc = viewProps.backgroundSrc;

    this.borderRadius = viewProps.borderRadius || 0;

    this.width = viewProps.width || 100
    this.height = viewProps.height || 60

    this.textProps = viewProps.textProps
    this.backgroundProps = viewProps.backgroundProps

    this.onClick = viewProps.onClick;
  }

  draw(ctx: CanvasRenderingContext2D): void {    
    ctx.fillStyle = this.color;
    ctx.strokeStyle = this.borderColor;

    ctx.fill();

    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(
      this.x - (this.width * 0.5), 
      this.y - (this.height * 0.5), 
      this.width, 
      this.height, 
      this.borderRadius
    );
    ctx.closePath();
  }

  handleClick(event: MouseEvent): void {
    const isInsideButton =
      event.clientX >= this.x - this.width / 2 &&
      event.clientX <= this.x + this.width / 2 &&
      event.clientY >= this.y - this.height / 2 &&
      event.clientY <= this.y + this.height / 2;

    if (isInsideButton) {
      this.onClick ();
    }
  }

  onCreate() {


    if (this.backgroundSrc) {
      const picture = new Picture({ x: this.x, y: this.y, src: this.backgroundSrc, ...this.backgroundProps })

      this.children.set(picture.id, picture);
    }

    if (this.text) {
      const text = new Typography({ x: this.x, y: this.y, text: this.text, width: this.width, ...this.textProps })

     this.children.set(text.id, text);
    }

  }

  onUpdate() {}

  onUnMount(): void {}
}