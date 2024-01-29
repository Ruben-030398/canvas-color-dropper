import { BaseActions } from "./action-types"

export type UploadImageAction = {
  type: BaseActions.IMAGE_UPLOADED,
  payload: { file: File }
}

export const uploadImage = (file: File): UploadImageAction => {
  return {
    type: BaseActions.IMAGE_UPLOADED,
    payload: { file }
  }
}

export type SetLupaScale = {
  type: BaseActions.SET_LUPA_SCALE,
  payload: number,
}

export const setLupaScale = (scale: number): SetLupaScale => {
  return {
    type: BaseActions.SET_LUPA_SCALE,
    payload: scale
  }
}

export type SetColor = {
  type: BaseActions.SET_COLOR,
  payload: string,
}

export const setColor = (color: string): SetColor => {
  return {
    type: BaseActions.SET_COLOR,
    payload: color
  }
}


export type BaseActionTypes = UploadImageAction | SetLupaScale | SetColor 