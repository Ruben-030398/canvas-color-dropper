import DisplayObject from "../display-object";
import { TypographyProps } from "./types";

export default class Typography extends DisplayObject {
  text: string
  font?: string;
  fontSize: number
  lineWidth?: number;
  fillStyle?: string;
  strokeStyle?: string;
  wordBreak: 'auto' | 'none'
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;

  constructor(viewProps: TypographyProps) {
    super(viewProps);

    this.strokeStyle = viewProps.strokeStyle
    this.strokeStyle = viewProps.strokeStyle
    this.lineWidth = viewProps.lineWidth || 5
    this.fillStyle = viewProps.fillStyle || 'black'
    this.textAlign = viewProps.textAlign || 'center'

    this.fontSize = viewProps.fontSize || 16;
    this.textBaseline = viewProps.textBaseline || 'middle'
    this.font = viewProps.font || `${this.fontSize}px Arial`

    this.wordBreak = viewProps.wordBreak || 'none';

    this.text = viewProps.text
  }

  #breakText(ctx: CanvasRenderingContext2D) {
    const words = this.text.split(' ');
    let currentLine = words[0];
    let currentY = this.y;

    for (let i = 1; i < words.length; i++) {
      const testLine = currentLine + ' ' + words[i];
      const testWidth = ctx.measureText(testLine).width;

      if (testWidth < this.width) {
        currentLine = testLine;
      } else {
        ctx.fillText(currentLine, this.x, currentY);
        currentY += this.fontSize;
        currentLine = words[i];
      }
    }

    ctx.fillText(currentLine, this.x, currentY);
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.font = this.font || ''
    ctx.font = `600 ${this.fontSize * Math.min(this.scaleX * this.scaleY)}px Arial`
    ctx.fillStyle = this.fillStyle || ''
    ctx.textAlign = this.textAlign || 'center'
    ctx.lineWidth = this.lineWidth || 1
    ctx.strokeStyle = this.strokeStyle || ''
    ctx.textBaseline = this.textBaseline || 'middle'

    if (ctx.measureText(this.text).width > this.width && this.wordBreak === 'auto') {
      this.#breakText(ctx)
    } else {
      ctx.fillText(this.text, this.x, this.y);
    }
    ctx.closePath();
  }

  onCreate(): void {

  }

  onUpdate(): void {

  }

  onUnMount(): void {

  }
}