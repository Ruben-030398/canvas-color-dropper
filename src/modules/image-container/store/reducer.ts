import { ImageInfoActions } from "./action-types"
import { ImageInfoActionsTypes } from "./actions"
import { ImageInfo } from "./types"

const defaultState: ImageInfo = {
  src: '',
  name: '',
}

export const imageInfoReducer = (state: ImageInfo = defaultState, action: ImageInfoActionsTypes) => {
  switch (action.type) {
    case ImageInfoActions.SET_IMAGE_INFO:
      return { ...state, ...action.payload };
    default:
      return state
  }
}