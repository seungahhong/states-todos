import { createReducer } from 'typesafe-actions';
import produce from 'immer';

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
import { getTodoItem } from '../selectors';
import { TodoState, TodoAction } from '../store/types';

const initialState: TodoState = {
  todoItem: [],
  loading: false,
  message: '',
};

export default createReducer<TodoState, TodoAction>(initialState, {
  [FETCH_TODO]: (state, action) => produce(state, draft => {
    draft.todoItem = action.payload.todoItem;
  }),
});

