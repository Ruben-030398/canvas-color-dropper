import { createStore, applyMiddleware,combineReducers, Middleware } from 'redux';

import { reducers } from './reducers';
import { middlewares } from './middlewares';
import { Actions } from './actions';

const rootReducer = combineReducers(reducers);

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore<RootState, Actions>(
  //@ts-ignore
  rootReducer,
  applyMiddleware(...middlewares as Array<Middleware>)
);

console.log(store, 'store');


export type AppDispatch = typeof store.dispatch

export default store;
