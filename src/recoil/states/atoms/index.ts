import { atom, selector } from 'recoil';
import { deleteTodo } from '../../../reduxToolkit/services';
import { createTodo, fetchTodo, updateTodo } from '../../services';
import { CREATE_TODO, DELETE_TODO, FETCH_TODO, UPDATE_TODO } from '../constants';
import { TodoState } from '../types';

const initialState: TodoState = {
    data: [],
    loading: false,
    message: '',
};

export const TodoItemAtom = atom<TodoState>({
    key: 'TodoItemState',
    default: initialState,
});

export const fetchState = atom<number>({
    key: 'fetchState',
    default: 1,
});

export const createState = atom<any>({
    key: 'createState',
    default: {}
});

export const updateState = atom<any>({
    key: 'updateState',
    default: {},
});

export const deleteState = atom<number>({
    key: 'deleteState',
    default: 1,
});


// get all todos api
export const fetchAsyncTodosAction = selector<any>({
    key: 'fetchAsyncTodosAction',
    get: async ({get}) => {
        const { data: todoItem } = await fetchTodo();
       return  todoItem;
    },
});

export const fetchAsyncTodoAction = selector<any>({
    key: 'fetchAsyncTodoAction',
    get: async ({get}) => {
        const response = await fetchTodo(get(fetchState));
        return [].concat(response.data);
    },
    set: ({set}, newValue) => {
        set(fetchState, Number(newValue));
    }
});

export const createAsyncTodoAction = selector<any>({
    key: 'createAsyncTodoAction',
    get: async ({get}) => {
        const response = await createTodo(get(createState));
        return [].concat(response.data);
    },
    set: ({set}, newValue) => {
        set(createState, newValue);
    }
});

export const updateAsyncTodoAction = selector<any>({
    key: 'updateAsyncTodoAction',
    get: async ({get}) => {
        const { id, todoItem } = get(updateState);
        const response = await updateTodo(id, todoItem);
        return {
            id,
            data: response.data,
        };
    },
    set: ({set}, newValue) => {
        set(updateState, newValue);
    }
});

export const deleteAsyncTodoAction = selector<any>({
    key: 'deleteAsyncTodoAction',
    get: async ({get}) => {
        await deleteTodo(get(deleteState));
        return deleteState;
    },
    set: ({set}, newValue) => {
        set(deleteState, newValue);
    }
});

export const todoListFilterState = atom({
    key: 'todoListFilterState',
    default: 'FETCH_TODOS',
});

export const filteredTodoListState = selector<any>({
    key: 'filteredTodoListState',
    get: ({get}) => {
      const filter = get(todoListFilterState);
      switch (filter) {
        case FETCH_TODO:
          return get(fetchAsyncTodoAction);
        case CREATE_TODO:
          return get(createAsyncTodoAction);
        case UPDATE_TODO:
          return get(updateAsyncTodoAction);  
        case DELETE_TODO:
          return get(deleteAsyncTodoAction);
        default:
          return get(fetchAsyncTodosAction);
      }
    },
});

export const todoItemLengthState = selector({
    key: 'todoItemLengthState',
    get: ({get}) => {
      const todoList = get(TodoItemAtom);
      return todoList.data.length;
    },
});
  
