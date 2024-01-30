import { BaseActions } from "./action-types"
import { BaseActionTypes } from "./actions"
import { Base } from "./types"

const defaultState: Base = {
  lupaScale: 5,
  color: '',
}

export const baseReducer = (state: Base = defaultState, action: BaseActionTypes): Base => {
  switch (action.type) {
    case BaseActions.SET_LUPA_SCALE:
      return { ...state, lupaScale: action.payload }
    case BaseActions.INCREASE_LUPA_SCALE:
      return { ...state, lupaScale: state.lupaScale + 1 }
    case BaseActions.DECREASE_LUPA_SCALE:
      return { ...state, lupaScale: state.lupaScale - 1 }
    case BaseActions.SET_COLOR:
      return { ...state, color: action.payload }
    default:
      return state
  }
}