import { ImageInfoActions } from "./action-types"
import { ImageInfo } from "./types"

export type SetImageInfoAction = {
  type: ImageInfoActions.SET_IMAGE_INFO,
  payload: ImageInfo
}

export const setImageInfo = (info: ImageInfo): SetImageInfoAction => {
  return {
    type: ImageInfoActions.SET_IMAGE_INFO,
    payload: info
  }
}

export type ImageInfoActionsTypes = SetImageInfoAction