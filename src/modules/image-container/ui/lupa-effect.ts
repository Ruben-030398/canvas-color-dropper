import { DisplayObject } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { setColor } from "@/modules/base/store/actions";
import store, { RootState } from "@/store";

export default class LupaEffect extends DisplayObject {
  scale: number;
  pixelColorHex: string

  constructor(props: ViewProps) {
    super(props);

    this.pixelColorHex = '';
  }

  draw(ctx: CanvasRenderingContext2D | null): void {
    const canvas = ctx?.canvas

    if (!ctx || !canvas) return;

    ctx.save();
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.width, 0, 2 * Math.PI);
    ctx.clip();

    ctx.drawImage(
      canvas,
      this.x - this.width / this.scale,
      this.y - this.height / this.scale,
      this.width,
      this.height,
      this.x - this.width,
      this.y - this.height,
      this.width * this.scale, this.height * this.scale
    );

    const imageData = ctx.getImageData(this.x, this.y, 1, 1).data;

    const redHex = imageData[0].toString(16).padStart(2, '0');
    const greenHex = imageData[1].toString(16).padStart(2, '0');
    const blueHex = imageData[2].toString(16).padStart(2, '0');

    this.pixelColorHex = `#${redHex}${greenHex}${blueHex}`;

    const step = 5;
    const gap = 8;

    for (let y = step; y < this.height * 2; y += gap) {
      ctx.lineWidth = 0.5
      ctx.strokeStyle = this.pixelColorHex;
      ctx.moveTo(this.x - this.width, this.y - this.height + y);
      ctx.lineTo(this.x + this.width, this.y - this.height + y);
      ctx.stroke();
    }

    for (let x = step; x < this.width * 2; x += gap) {
      ctx.lineWidth = 0.1
      ctx.strokeStyle = this.pixelColorHex;
      ctx.moveTo(this.x - this.width + x, this.y - this.height);
      ctx.lineTo(this.x - this.width + x, this.y + this.height);
      ctx.stroke();
    }

    ctx.beginPath();
    ctx.strokeStyle = this.pixelColorHex;
    ctx.lineWidth = 20
    ctx.arc(this.x, this.y, this.width, 0, Math.PI * 2);
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.lineWidth = 0.5;
    ctx.strokeStyle = `#fff`;
    ctx.rect(this.x, this.y, gap, gap);
    ctx.closePath();
    ctx.stroke();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = `#e3e3e3`;
    ctx.roundRect(this.x - 35, this.y + 20, 70, 30, 5);
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = '#000';
    ctx.font = "16px serif";
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(this.pixelColorHex, this.x, this.y + 35)
    ctx.closePath();

    ctx.restore();
  }

  onCreate(state: RootState): void {
    console.log(state.base.lupaScale, 'store.base.lupaScale;');
    this.interactive = true;

    this.on('pointerdown', () => store.dispatch(setColor(this.pixelColorHex)));

    this.scale = state.base.lupaScale;
  }

  onUnMount(): void {
  }

  onUpdate(scale: number): void {
    this.scale = scale
  }
}