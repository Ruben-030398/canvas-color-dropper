import { ViewProps } from "../display-object/types"

export type TypographyProps = {
  font?: string;
  fillStyle?: string;
  strokeStyle?: string;
  lineWidth?: number;
  textAlign?: CanvasTextAlign;
  textBaseline?: CanvasTextBaseline;
  text: string
  fontSize?: number;
} & ViewProps