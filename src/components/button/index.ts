import gsap from 'gsap';

import DisplayObject from '../display-object';
import Typography from '../typography';
import Picture from '../picture';

import { TypographyProps } from '../typography/types';
import { PictureProps } from '../picture/types';

import { ButtonProps } from './types';
import { Scale } from '../display-object/types';
import { isObject } from 'lodash';
export default class Button extends DisplayObject {
  color: string;
  text?: string
  backgroundSrc?: string
  borderRadius?: Array<number> | number
  textProps?: Partial<TypographyProps>
  backgroundProps?: Partial<PictureProps>
  borderColor?: string;
  onClick?: () => void
  scale: Scale;

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

    this.scale = isObject(viewProps.scale) ? viewProps.scale : { x: 1, y: 1 };

    this.onClick = viewProps.onClick && viewProps.onClick.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D): void {
    ctx.fillStyle = this.color;

    ctx.strokeStyle = 'transparent';

    ctx.scale(1, 1)

    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(
      this.x - (this.width * 0.5 * this.scale.x),
      this.y - (this.height * 0.5 * this.scale.y),
      this.width * this.scale.x,
      this.height * this.scale.y,
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
        x: this.x + (this.backgroundProps?.x || 0),
        y: this.y + (this.backgroundProps?.y || 0),
        src: this.backgroundSrc,
      })

      this.mount(picture)
    }

    if (this.text) {
      text = new Typography({
        ...this.textProps,
        x: this.x + (this.textProps?.x || 0),
        y: this.y + (this.textProps?.y || 0),
        text: this.text,
        width: this.width,
      })

      this.mount(text)
    }

    this.onClick && this.on('pointerdown', () => {
      const initialScaleX = this.scale.x;
      const initialScaleY = this.scale.y;

      gsap.to(this.scale, {
        x: initialScaleX * 0.9,
        y: initialScaleY * 0.9,
        yoyo: true,
        duration: 0.1,
        onComplete: () => {
          gsap.to(this.scale, {
            x: initialScaleX,
            y: initialScaleY,
          })
        }
      })

      if (picture) {
        const initialWidth = picture.width;
        const initialHeight = picture.height;

        gsap.to(picture, {
          height: initialWidth * 0.9,
          width: initialHeight * 0.9,
          yoyo: true,
          duration: 0.1,
          onComplete: () => {
            gsap.to(picture, {
              height: initialWidth,
              width: initialHeight,
            })
          }
        })
      }

      if (text) {
        const initialFontSize = text.fontSize;

        gsap.to(text, {
          fontSize: initialFontSize * 0.9,
          yoyo: true,
          duration: 0.1,
          onComplete: () => {
            gsap.to(text, {
              fontSize: initialFontSize,
            })
          }
        })
      }

      this.onClick && this.onClick()
    });
  }

  onUpdate() { }

  onUnMount(): void { }
}