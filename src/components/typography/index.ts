import DisplayObject from "../display-object";
import { TypographyProps } from "./types";

export default class Typography extends DisplayObject {
  text: string
  font?: string;
  lineWidth?: number;
  fillStyle?: string;
  strokeStyle?: string;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  fontSize: number

  constructor(viewProps: TypographyProps) {
    super(viewProps);

    console.log(viewProps, 'viewProps');
    

    this.strokeStyle = viewProps.strokeStyle
    this.strokeStyle = viewProps.strokeStyle
    this.lineWidth = viewProps.lineWidth || 5
    this.fillStyle = viewProps.fillStyle || 'blue'
    this.textAlign = viewProps.textAlign || 'center'

    this.fontSize = viewProps.fontSize || 16;
    this.textBaseline = viewProps.textBaseline || 'middle'
    this.font = viewProps.font || `bold ${this.fontSize}px Poppins sans-serif`

    this.text = viewProps.text
  }


  #breakText(ctx: CanvasRenderingContext2D){
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
    ctx.font = this.font
    ctx.fillStyle = this.fillStyle
    ctx.textAlign = this.textAlign
    ctx.lineWidth = this.lineWidth
    ctx.strokeStyle = this.strokeStyle
    ctx.strokeStyle = this.strokeStyle
    ctx.textBaseline = this.textBaseline

    if (ctx.measureText(this.text).width > this.width) {
      this.#breakText(ctx)
    } else {
      ctx.fillText(this.text, this.x, this.y);
    }
  }

  onCreate(): void {

  }

  onUpdate(): void {

  }

  onUnMount(): void {

  }
}