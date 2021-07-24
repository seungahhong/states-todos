import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import todos from '../features';

const store = configureStore({
  reducer: {
    todos: todos,
  },
  middleware: getDefaultMiddleware().concat(logger),
});

export const RootState = store.getState;
export const RootDispatch = store.dispatch;

export default store;
