import gsap from 'gsap';

import DisplayObject from '../display-object';
import Typography from '../typography';
import Picture from '../picture';

import { TypographyProps } from '../typography/types';
import { PictureProps } from '../picture/types';
import { ButtonProps } from './types';

export default class Button extends DisplayObject {
  text?: string
  color: string;
  borderColor?: string;
  onClick?: () => void
  backgroundSrc?: string
  textProps?: Partial<TypographyProps>
  borderRadius?: Array<number> | number
  backgroundProps?: Partial<PictureProps>

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

    this.onClick = viewProps.onClick && viewProps.onClick.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;

    ctx.strokeStyle = 'transparent';

    ctx.scale(1, 1)

    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(
      this.x - (this.width * 0.5 * this.scaleX),
      this.y - (this.height * 0.5 * this.scaleY),
      this.width * this.scaleX,
      this.height * this.scaleY,
      this.borderRadius
    );

    ctx.closePath();

    ctx.fill();
  }

  onCreate() {
    let picture: null | Picture = null;
    let text: null | Typography = null;

    if (this.backgroundSrc) {
      picture = new Picture({
        ...this.backgroundProps,
        src: this.backgroundSrc,
      })

      this.mount(picture)
    }

    if (this.text) {
      text = new Typography({
        ...this.textProps,
        text: this.text,
      })

      this.mount(text)
    }

    const initialScaleX = this.scaleX;
    const initialScaleY = this.scaleY;

    this.onClick && this.on('pointerdown', () => {
      gsap.to(this, {
        scaleX: initialScaleX * 0.9,
        scaleY: initialScaleY * 0.9,
        yoyo: true,
        duration: 0.1,
        onComplete: () => {
          gsap.to(this, {
            scaleX: initialScaleX,
            scaleY: initialScaleY,
          })
        }
      })

      this.onClick && this.onClick()
    });
  }

  onUpdate() { }

  onUnMount(): void { }
}