import * as reducers from './reducers';
import { combineReducers } from 'redux';
import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import thunkMiddleware from 'redux-thunk';

const appReducer = (combineReducers(reducers));
const middlewares = [thunkMiddleware];
if (process.env.NODE_ENV === 'development') {
  middlewares.push(logger);
}
export const store = createStore(appReducer, composeWithDevTools(
  applyMiddleware(...middlewares)
));

store.asyncReducers = {};

const createInjectReducer = store => (key, reducer) => {
  store.asyncReducers[key] = reducer;
  store.replaceReducer(combineReducers({ ...reducers, ...store.asyncReducers }))
}

export const injectReducer = createInjectReducer(store);


export default store;