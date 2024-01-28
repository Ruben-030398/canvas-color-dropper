import { baseMiddleware } from "@/modules/base/store/middleware";
import { imageUploadedMiddleware } from "@/modules/image-container/store/middleware";

export default [
  baseMiddleware,
  imageUploadedMiddleware,
]