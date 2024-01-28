import { baseMiddleware } from "@/modules/base/store/middleware";
import { imageUploadedMiddleware } from "@/modules/image-container/store/middleware";

export const middlewares = [
  baseMiddleware,
  imageUploadedMiddleware,
]