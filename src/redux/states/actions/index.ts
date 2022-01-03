import { createAction } from 'typesafe-actions';
import { TodoItemState, TypedThunk } from '../store/types';
import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_ERROR,
} from '../../constants';
import {
  fetchTodo,
} from '../../services';

export const fetchTodoActionSuccess = createAction(FETCH_TODO_SUCCESS, (todoItem: TodoItemState[]) => ({ todoItem }))();
export const fetchTodoActionRequest = createAction(FETCH_TODO_REQUEST)();
export const fetchTodoActionError = createAction(FETCH_TODO_ERROR, (error) => ({ error }))();

export const fetchAsyncTodoAction = (args: number | undefined): TypedThunk => async (dispatch) =>  {

  try {
    dispatch(fetchTodoActionRequest());

    const { data: todoItem } = await fetchTodo(args);
    dispatch(fetchTodoActionSuccess(Array.isArray(todoItem) ? todoItem : [].concat(todoItem)));
  } catch(e) {
    dispatch(fetchTodoActionError(e));
  }
};
