import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';
import rootReducer from './configureStore';

const store = () => {
  const store = createStore(
    rootReducer(),
    applyMiddleware(
      thunkMiddleware,
      logger,
    ),
  );
  return store;
};

export const RootState = store().getState;
export const RootDispatch = store().dispatch;

export default store();
