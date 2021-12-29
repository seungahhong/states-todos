import { createAction } from 'typesafe-actions';
import { TodoItemState, TypedThunk } from '../store/types';
import {
  FETCH_TODO,
  FETCH_ASYNC_TODO,
  CREATE_TODO,
  CREATE_ASYNC_TODO,
  UPDATE_TODO,
  UPDATE_ASYNC_TODO,
  DELETE_TODO,
  DELETE_ASYNC_TODO,
} from '../../constants';
import {
  fetchTodo,
} from '../../services';

export const fetchTodoAction = createAction(FETCH_TODO, (todoItem: TodoItemState[]) => ({ todoItem }))();

export const fetchAsyncTodoAction = (args: number | undefined): TypedThunk => async (dispatch) =>  {
  const { data: todoItem } = await fetchTodo(args);
    
  dispatch(fetchTodoAction(Array.isArray(todoItem) ? todoItem : [].concat(todoItem)));
};
