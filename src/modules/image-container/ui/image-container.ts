import { DisplayObject, Picture } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { ImageInfo } from "../store/types";

export default class ImageContainer extends DisplayObject {
  image: Picture
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
      width: window.innerWidth * .8,
      height: window.innerHeight * .8,
      interactive: true,
    });

    this.image.on('pointermove', () => console.log('pointermove'))

    window.addEventListener('resize', this.onResize);

    this.mount(this.image)
  }

  onResize() {
    const minWidth = window.innerWidth * 0.8;
    const minHeight = window.innerHeight * 0.8;

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

  onUpdate(update: ImageInfo): void {
    this.image.updateSrc(update.src, this.onResize)
  }

  onUnMount(): void {
    window.removeEventListener('resize', this.onResize);
  }
}