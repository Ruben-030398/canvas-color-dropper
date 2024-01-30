import { Button, DisplayObject, Typography } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { RootState } from "@/store";
import ScaleButtons from "./scale-buttons";

export class Toolbar extends DisplayObject {
  selectedColor: Typography
  color: string;
  copyButton: Button
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

    const scaleButtons = new ScaleButtons({
      x: window.innerWidth / 2,
      y: 70,
    })

    this.selectedColor = new Typography({
      x: window.innerWidth / 2,
      y: 70,
      text: this.color,
    });

    this.copyButton = new Button({
      x: window.innerWidth / 2 + 70,
      y: 70,
      width: 60,
      height: 35,
      text: 'Copy',
      borderRadius: 5,
      renderable: !!this.color,
       color: 'Black',
      onClick: () => navigator.clipboard.writeText(this.color),
      textProps: { fillStyle: '#fff' },
      backgroundProps: { width: 75, height: 75 }
    })

    this.mount(this.selectedColor);
    this.mount(this.copyButton);
    this.mount(scaleButtons);

    window.addEventListener('resize', this.onResize);
  }

  onResize() {
    this.selectedColor.update({
      x: window.innerWidth / 2
    })

    this.copyButton.update<Button>({
      x: window.innerWidth / 2 + 70,
    });
  }

  onUpdate(color: string): void {
    this.color = color
    this.selectedColor.update<Typography>({
      text: this.color
    });
    this.copyButton.update({
      renderable: !!this.color,
    });
  }

  onUnMount(): void {
    window.removeEventListener('resize', this.onResize);
  }
}