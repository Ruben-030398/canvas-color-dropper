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
  textProps?: Partial<TypographyProps>
  backgroundProps?: Partial<PictureProps>
  borderColor?: string;
  onClick?: () => void

  constructor(viewProps: ButtonProps) {
    super({ ...viewProps, interactive: true });
    this.text = viewProps.text;

    this.color = viewProps.color || 'transparent';

    this.borderColor = viewProps.borderColor || this.color;

    this.backgroundSrc = viewProps.backgroundSrc;

    this.borderRadius = viewProps.borderRadius || 0;

    this.width = viewProps.width || 100
    this.height = viewProps.height || 60

    this.textProps = viewProps.textProps || {}
    this.backgroundProps = viewProps.backgroundProps || {}

    this.onClick = viewProps.onClick ? viewProps.onClick.bind(this) : null;
  }

  draw(ctx: CanvasRenderingContext2D): void {   
    ctx.fillStyle = this.color;

    ctx.strokeStyle = 'transparent';
    
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

    ctx.fill();
  }

  onCreate() {
    this.onClick && this.on('pointerdown', this.onClick);

    if (this.backgroundSrc) {
      const picture = new Picture({ 
        ...this.backgroundProps, 
        x: this.x + (this.backgroundProps.x || 0), 
        y: this.y + (this.backgroundProps.y || 0), 
        src: this.backgroundSrc, 
      })

      this.mount(picture)
    }

    if (this.text) {
      console.log(this.y + (this.textProps.y || 0) , 'this.textProps.y ');
      
      const text = new Typography({ 
        ...this.textProps,
        x: this.x + (this.textProps.x || 0), 
        y: this.y + (this.textProps.y || 0), 
        text: this.text, 
        width: this.width, 
      })

     this.mount(text)
    }
    
  }

  onUpdate() {}

  onUnMount(): void {}
}