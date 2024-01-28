import { BaseActionTypes } from "./action-types"

export type UploadImageAction =  {
  type: BaseActionTypes.IMAGE_UPLOADED,
  payload: { file: File | Blob }
}

export const uploadImage = (file: File | Blob): UploadImageAction => {
  return {
    type: BaseActionTypes.IMAGE_UPLOADED,
    payload: { file }
  }
}