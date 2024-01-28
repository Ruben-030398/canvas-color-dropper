import { BaseActions } from "./action-types"

export type UploadImageAction =  {
  type: BaseActions.IMAGE_UPLOADED,
  payload: { file: File }
}

export const uploadImage = (file: File): UploadImageAction => {
  return {
    type: BaseActions.IMAGE_UPLOADED,
    payload: { file }
  }
}

export type BaseActionTypes = UploadImageAction