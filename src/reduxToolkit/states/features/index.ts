// ducks pattern 구조
import {
  Selector,
  createSlice, // handleActions 대체
  createAction,
  createSelector,
  createAsyncThunk, // redux-thunk 수신 간소화
} from "@reduxjs/toolkit";
import {
  FETCH_TODO,
  FETCH_ASYNC_TODO,
  CREATE_TODO,
  CREATE_ASYNC_TODO,
  UPDATE_TODO,
  UPDATE_ASYNC_TODO,
  DELETE_TODO,
  DELETE_ASYNC_TODO,
} from '../constants';
import {
  fetchTodo,
  createTodo,
  deleteTodo,
  updateTodo,
} from '../../services';
import { TodoItemState, TodoState, TodoAction, RootState } from '../types';

/**
 * createSelector
 */
const getTodo = (state: RootState) => state.todos;
export const getTodoItemLengthState: Selector<RootState, number> = createSelector(
  getTodo,
  (state: TodoState) => state.todoItem.length,
)

// createActions이 없어서 createAction으로 대체
export const fetchTodoAction = createAction(FETCH_TODO, (todoItem: TodoItemState[]) => ({ payload: { todoItem }}));
export const createTodoAction = createAction(CREATE_TODO, (todoItem: TodoItemState[]) => ({ payload: { todoItem }}));
export const updateTodoAction = createAction(UPDATE_TODO, (id: number, todoItem: TodoItemState[]) => ({ payload: { id, todoItem }}));
export const deleteTodoAction = createAction(DELETE_TODO, (id: number) => ({ payload: id }));

// createActions이 없어서 createAction으로 대체
export const fetchAsyncTodoAction = createAsyncThunk(FETCH_ASYNC_TODO, async (args: number | undefined, thunkAPI) => {
  const { data: todoItem } = await fetchTodo(args);

  // const { dispatch } = thunkAPI;
  // dispatch(fetchTodoAction(Array.isArray(todoItem) ? todoItem : [].concat(todoItem)));
  return {
    todoItem: Array.isArray(todoItem) ? todoItem : [].concat(todoItem),
  };
});

export const createAsyncTodoAction = createAsyncThunk(CREATE_ASYNC_TODO, async (args: TodoItemState, thunkAPI) => {
  const { data: todoItem } = await createTodo(args);

  // const { dispatch } = thunkAPI;
  // dispatch(createTodoAction(todoItem));
  return { 
    todoItem,
  };
});

export const updateAsyncTodoAction = createAsyncThunk(UPDATE_ASYNC_TODO, async (args: { id: number, todoItem: TodoItemState }, thunkAPI) => {
  const { id, todoItem } = args;
  const { data } = await updateTodo(id, todoItem);

  // const { dispatch } = thunkAPI;
  // dispatch(updateTodoAction(id, data));
  return {
    id,
    data,
  };
});

export const deleteAsyncTodoAction = createAsyncThunk(DELETE_ASYNC_TODO, async (args: number, thunkAPI) => {
  await deleteTodo(args);

  // const { dispatch } = thunkAPI;
  // dispatch(deleteTodoAction(args));
  return {
    id: args,
  };
});

// reducer, immer 내장
const initialState: TodoState = {
  todoItem: [],
  loading: false,
  message: '',
};

const loadingReducerCb = (state: TodoState, action: TodoAction) => {
  // 호출전
  return {
    ...state,
    loading: true,
  };
};

const fulfilledReducerCb = (state: TodoState, todoItem: TodoItemState[]) => {
  // 성공
  return {
    ...state,
    loading: false,
    todoItem,
    message: '성공했습니다...',
  };
};

const rejectedReducerCb = (state: TodoState, action: TodoAction) => {
  // 실패
  return {
    ...state,
    loading: false,
    message: '실패했습니다...',
  };
};

// redux-actions handleActions 내장
const counter = createSlice({
  name: 'todos',
  initialState,
  reducers: { }, // key값으로 정의한 이름으로 자동으로 액션함수 생성
  extraReducers: { // 사용자가 정의한 이름의 액션함수가 생성
    [FETCH_TODO]: (state, action) => {
      return {
        ...state,
        todoItem: action.payload.todoItem,
      };
    },
    [CREATE_TODO]: (state, action) => {
      return {
        ...state,
        todoItem: state.todoItem.concat(action.payload.todoItem),
      };
    },
    [UPDATE_TODO]: (state, action) => {
      return {
        ...state,
        todoItem: state.todoItem.map(todo => todo.id !== action.payload.todoItem.id ? todo : action.payload.todoItem),
      };
    },
    [DELETE_TODO]: (state, action) => {
      return {
        ...state,
        todoItem: state.todoItem.filter(todo => todo.id !== action.payload),
      };
    },
    [fetchAsyncTodoAction.pending.type]: loadingReducerCb,
    [createAsyncTodoAction.pending.type]: loadingReducerCb,
    [updateAsyncTodoAction.pending.type]: loadingReducerCb,
    [deleteAsyncTodoAction.pending.type]: loadingReducerCb,

    [fetchAsyncTodoAction.fulfilled.type]: (state, action) => fulfilledReducerCb(state,  action.payload.todoItem),
    [createAsyncTodoAction.fulfilled.type]: (state, action) => fulfilledReducerCb(state, state.todoItem.concat(action.payload.todoItem)),
    [updateAsyncTodoAction.fulfilled.type]: (state, action) => fulfilledReducerCb(state, state.todoItem.map(todo => todo.id !== action.payload.id ? todo : action.payload.data)),
    [deleteAsyncTodoAction.fulfilled.type]: (state, action) => fulfilledReducerCb(state, state.todoItem.filter(todo => todo.id !== action.payload.id)),

    [fetchAsyncTodoAction.rejected.type]: rejectedReducerCb,
    [createAsyncTodoAction.rejected.type]: rejectedReducerCb,
    [updateAsyncTodoAction.rejected.type]: rejectedReducerCb,
    [deleteAsyncTodoAction.rejected.type]: rejectedReducerCb,
  },
});

export default counter.reducer;
