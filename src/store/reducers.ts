import { baseReducer } from "@/modules/base/store/reducer";
import { imageInfoReducer } from "@/modules/image-container/store/reducer";

export const reducers = {
  base: baseReducer,
  imageInfo: imageInfoReducer,
};