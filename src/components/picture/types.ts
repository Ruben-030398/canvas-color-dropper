import { ViewProps } from "../display-object/types"

export type PictureProps = {
  src: string;
  anchor?: [number, number]
} & ViewProps