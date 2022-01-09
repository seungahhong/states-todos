import { call, put, takeEvery } from "redux-saga/effects";
import { FETCH_TODO_SAGA } from "../constants";
import { fetchTodoSagaAsyncAction } from "../features";
import { fetchTodo } from "../../services";
import axios, { AxiosError } from "axios";

function* fetchAsyncSagaTodoAction(action: ReturnType<typeof fetchTodoSagaAsyncAction.request>) {
  try {
    const { data: todoItem } = yield call(fetchTodo, action.payload);
    yield put(fetchTodoSagaAsyncAction.success(Array.isArray(todoItem) ? todoItem : [].concat(todoItem)));
  } catch (err: unknown) {
    if (axios.isAxiosError(err))  {
      yield put(fetchTodoSagaAsyncAction.failure(err as AxiosError));
    }
  }
}

export function* todoSaga() {
  yield takeEvery(FETCH_TODO_SAGA, fetchAsyncSagaTodoAction);
}
