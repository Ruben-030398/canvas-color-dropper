import { DisplayObject } from "@/components";

export type RootObject = {
  ctx: CanvasRenderingContext2D | null;
} & DisplayObject