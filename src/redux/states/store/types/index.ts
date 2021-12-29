import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { fetchTodoAction } from "../../actions";
import { RootState, RootDispatch } from '../../store';
import { TodoItem } from '../../../types';

// reducers
export interface TodoState {
  todoItem: TodoItemState[],
  loading: boolean,
  message: string,
}

export type TodoItemState = TodoItem;

// actions
export type TodoAction = ReturnType<typeof fetchTodoAction>;

export type TypedThunk = ThunkAction<void, TodoState, unknown, TodoAction>;
export type TypedThunkDispath = ThunkDispatch<TodoState, unknown, TodoAction>;

// reducers
export type RootState = ReturnType<typeof RootState>;
export type RootDispatch = typeof RootDispatch;