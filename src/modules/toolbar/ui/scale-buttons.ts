import { Button, DisplayObject, Typography } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { RootState } from "@/store";

export default class ScaleButtons extends DisplayObject {
  plusButton: Button
  minusButton: Button
  scale: Typography
  constructor(props: ViewProps) {
    super(props)

  }

  draw(): void {

  }

  onCreate(state: RootState): void {
    this.plusButton = new Button({ 
      x: window.innerWidth * 0.2,
      y: 70, 
      color: 'black',
      width: 35,
      height: 35,
      text: "+",
      textProps: { fillStyle: '#fff' },
      borderRadius: 5,
      onClick: () => console.log('aaaa'),
    })

    this.scale = new Typography({
      x: window.innerWidth * 0.2 + 55,
      y: 70, 
      text: `Scale: ${state.base.lupaScale}`
    })

    this.minusButton = new Button({ 
      x: window.innerWidth * 0.2 + 110,
      y: 70, 
      color: 'black',
      width: 35,
      height: 35,
      text: "-",
      textProps: { fillStyle: '#fff' },
      borderRadius: 5,
      onClick: () => console.log('aaaa'),
    })

    this.mount(this.plusButton);
    this.mount(this.scale);
    this.mount(this.minusButton);
  }

  onResize() {
    
  }

  onUpdate(): void {

  }

  onUnMount(): void {

  }
}