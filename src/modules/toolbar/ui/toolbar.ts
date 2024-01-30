import { Button, DisplayObject, Typography } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { RootState } from "@/store";
import ScaleButtons from "./scale-buttons";


const MIN_WIDTH = 800;
export class Toolbar extends DisplayObject {
  color: string;
  copyButton: Button
  selectedColor: Typography
  scaleButtons: ScaleButtons
  constructor(props: ViewProps) {
    super(props);

    this.onResize = this.onResize.bind(this);
  }

  draw(ctx: CanvasRenderingContext2D | null): void {
    if (!ctx) return;

    ctx.beginPath();
    ctx.fillStyle = `#e3e3e3`;
    ctx.roundRect(
      50,
      35,
      Math.max(MIN_WIDTH - 100, window.innerWidth - 100),
      70,
      20
    );
    ctx.fill();
    ctx.closePath();

    const colorRectX = 
      window.innerWidth < MIN_WIDTH 
      ? window.innerWidth - ctx.measureText(this.color).width - 15
      : window.innerWidth / 2 - ctx.measureText(this.color).width - 15;

    ctx.beginPath();
    ctx.fillStyle = this.color;
    this.color && ctx.roundRect(
      colorRectX,
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

    this.scaleButtons = new ScaleButtons({
      x: 175,
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
    })

    this.mount(this.selectedColor);
    this.mount(this.copyButton);
    this.mount(this.scaleButtons, state => state.base.lupaScale);

    window.addEventListener('resize', this.onResize);
  }

  onResize() {
    if (window.innerWidth > MIN_WIDTH) {
      this.selectedColor.update({
        x: window.innerWidth / 2
      })

      this.copyButton.update({
        x: window.innerWidth / 2 + 70,
      });
    } else {
      this.selectedColor.update({
        x: window.innerWidth -150
      })

      this.copyButton.update({
        x: window.innerWidth -150 - 70,
      });
    }
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