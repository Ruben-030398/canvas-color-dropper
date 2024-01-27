import { createStore, combineReducers, Action } from 'redux';

export type RootState = {

}

const store = createStore<RootState, Action>(
  combineReducers({})
);

export default store;
