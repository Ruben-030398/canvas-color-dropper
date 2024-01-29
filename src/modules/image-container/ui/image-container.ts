import { DisplayObject, Picture, Typography } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { ImageInfo } from "../store/types";
import LupaEffect from "./lupa-effect";

export default class ImageContainer extends DisplayObject {
  image: Picture
  lupaEffect: LupaEffect
  hexColor: Typography
  constructor(props: ViewProps) {
    super(props);

    this.onResize = this.onResize.bind(this);
  }

  draw(): void {
  }

  onCreate(): void {
    this.image = new Picture({
      src: '',
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: window.innerWidth * .7,
      height: window.innerHeight * .7,
      interactive: true,
    });

    this.lupaEffect = new LupaEffect({
      x: 0,
      y: 0,
      width: 70,
      height: 70,
      renderable: false
    });

    this.hexColor = new Typography({
      x: window.innerWidth * 0.25,
      y: window.innerHeight * 0.25,
      text: ''
    })

    this.image.on('pointermove', (e) => {
      this.lupaEffect.renderable = true;

      document.documentElement.style.cursor = 'none';

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      this.lupaEffect.update({ x: mouseX, y: mouseY });
    });

    this.image.on('pointerout', () => {
      this.lupaEffect.renderable = false;

      document.documentElement.style.cursor = 'auto';
    })

    console.log(this.image.listeners);
    

    window.addEventListener('resize', this.onResize);

    this.mount(this.image)

    this.mount(this.lupaEffect, store => store.base.lupaScale)

    this.mount(this.hexColor)
  }

  onResize() {
    const minWidth = window.innerWidth * 0.7;
    const minHeight = window.innerHeight * 0.7;

    const widthScale = minWidth / this.image.image.width;
    const heightScale = minHeight / this.image.image.height;

    const scale = Math.min(widthScale, heightScale);

    this.image.update({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
      width: this.image.image.width * scale,
      height: this.image.image.height * scale,
    })
  }

  onUpdate(update: ImageInfo & { scale: number }): void {
    this.image.updateSrc(update.src, this.onResize)
  }

  onUnMount(): void {
    window.removeEventListener('resize', this.onResize);
  }
}