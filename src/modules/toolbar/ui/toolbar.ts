import { DisplayObject, Typography } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { RootState } from "@/store";

export class Toolbar extends DisplayObject {
  selectedColor: Typography
  color: string;
  constructor(props: ViewProps) {
    super(props);

    this.onResize = this.onResize.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) return;

    ctx.beginPath();
    ctx.fillStyle = `#e3e3e3`;
    ctx.roundRect(
      window.innerWidth * 0.175,
      35,
      window.innerWidth * 0.65,
      70,
      20
    );
    ctx.fill();
    ctx.closePath();
    
    ctx.beginPath();
    ctx.fillStyle = this.color;
    this.color && ctx.roundRect(
      window.innerWidth / 2 - ctx.measureText(this.color).width - 15, // gap,
      50,
      35,
      35,
      5
    );
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.fill();
    ctx.closePath();
  }

  onCreate(state: RootState): void {
    this.color = state.base.color;

    this.selectedColor = new Typography({
      x: window.innerWidth / 2,
      y: 70,
      text: this.color,
    });

    this.mount(this.selectedColor);

    window.addEventListener('resize', this.onResize);
  }

  onResize() {
    this.selectedColor.update({
      x: window.innerWidth / 2
    })
  }

  onUpdate(color: string): void {
    this.color = color
    this.selectedColor.update<Typography>({
      text: this.color
    })
  }

  onUnMount(): void {
    window.removeEventListener('resize', this.onResize);
  }
}