import { Button, DisplayObject, Typography } from "@/components";
import { ViewProps } from "@/components/display-object/types";
import { decreaseLupaScale, increaseLupaScale } from "@/modules/base/store/actions";
import store, { RootState } from "@/store";

export default class ScaleButtons extends DisplayObject {
  plusButton: Button
  minusButton: Button
  scaleText: Typography
  constructor(props: ViewProps) {
    super(props)
  }

  onCreate(state: RootState): void {
    this.plusButton = new Button({ 
      x: -55,
      color: 'black',
      width: 35,
      height: 35,
      text: "+",
      textProps: { fillStyle: '#fff' },
      borderRadius: 5,
      onClick: () => store.dispatch(increaseLupaScale()),
    })

    this.scaleText = new Typography({
      text: `Scale: ${state.base.lupaScale}`
    })

    this.minusButton = new Button({ 
      x: 55,
      color: 'black',
      width: 35,
      height: 35,
      text: "-",
      textProps: { fillStyle: '#fff' },
      borderRadius: 5,
      onClick: () =>store.dispatch(decreaseLupaScale()),
    })

    this.mount(this.plusButton);
    this.mount(this.scaleText);
    this.mount(this.minusButton);
  }

  draw(): void {

  }

  onUpdate(lupaScale: number): void {
    this.scaleText.update<Typography>({
      text: `Scale: ${lupaScale}`
    });
  }

  onUnMount(): void {

  }
}