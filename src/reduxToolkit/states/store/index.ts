import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all, fork } from 'redux-saga/effects';
import logger from 'redux-logger';
import { todoSaga } from '../saga';
import todos from '../features';

const sagaMiddleware = createSagaMiddleware();

function* saga() {
  yield all([fork(todoSaga)]);
}

const store = configureStore({
  reducer: {
    todos: todos,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(saga);

export const RootState = store.getState;
export const RootDispatch = store.dispatch;

export default store;
