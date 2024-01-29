import { BaseActions } from "./action-types"
import { BaseActionTypes } from "./actions"
import { Base } from "./types"

const defaultState: Base = {
  lupaScale: 2
}

export const baseReducer = (state: Base = defaultState, action: BaseActionTypes): Base => {
  switch (action.type) {
    case BaseActions.SET_LUPA_SCALE:
      return { ...state, lupaScale: action.payload }
    default:
      return state
  }
}