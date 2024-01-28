import { createStore, combineReducers, Action } from 'redux';

export type RootState = {

}

const store = createStore<RootState, Action>(
  //@ts-ignore
  combineReducers({})
);

export default store;
