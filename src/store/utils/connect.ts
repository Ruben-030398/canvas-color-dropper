import isEqual from 'lodash/isEqual'
import DisplayObject from "@/components/display-object";
import store, { RootState } from "@/store";

export const connect = (child: DisplayObject, getter: (state: RootState) => void) => {
  const state = store.getState();
  
  let prevState = getter(state);

  return () => {
    const stateListener = () => {
      const newState = getter(store.getState());

      if (!isEqual(prevState, newState)) {

        prevState = newState;

        child.onUpdate(newState)
      }
    }

    child.unsubscribe = store.subscribe(stateListener)
  }
}