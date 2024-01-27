import { ViewProps } from "../display-object/types"
import { PictureProps } from "../picture/types";
import { TypographyProps } from "../typography/types";

export type ButtonProps = {
  text?: string;
  backgroundSrc?: string;
  color?: string;
  borderRadius?: Array<number> | number
  textProps?: Partial<TypographyProps>
  backgroundProps?: Partial<PictureProps>
  borderColor?: string
  onClick?: () => void 
} & ViewProps