import { createReducer } from 'typesafe-actions';
import produce from 'immer';

import {
  FETCH_TODO_REQUEST,
  FETCH_TODO_SUCCESS,
  FETCH_TODO_ERROR,
} from '../../constants';
import { getTodoItem } from '../selectors';
import { TodoState, TodoAction } from '../store/types';

const initialState: TodoState = {
  todoItem: [],
  loading: false,
  message: '',
};

export default createReducer<TodoState, TodoAction>(initialState, {
  [FETCH_TODO_REQUEST]: (state, action) => produce(state, draft => {
    draft.loading = true;
  }),
  [FETCH_TODO_SUCCESS]: (state, action) => produce(state, draft => {
    draft.loading = false;
    draft.todoItem = action.payload.todoItem;
    draft.message = '성공했습니다...';
  }),
  [FETCH_TODO_ERROR]: (state, action) => produce(state, draft => {
    draft.loading = false;
    draft.todoItem = [];
    draft.message = '실패했습니다...';
  }),
});

