import { createStore, combineReducers, Action, applyMiddleware, Middleware } from 'redux';

import middlewares from './middlewares';

export type RootState = {

}

const store = createStore<RootState, Action>(
  //@ts-ignore
  combineReducers({}),
  applyMiddleware(...middlewares as Array<Middleware>)
);

export default store;
