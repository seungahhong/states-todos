import { atom } from "jotai";
import { selectAtom } from "jotai/utils";
import { atomWithQuery } from "jotai/query";
import { deleteTodo } from "../../../reduxToolkit/services";
import { createTodo, fetchTodo, updateTodo } from "../../services";
import {
  CREATE_TODO,
  DELETE_TODO,
  FETCH_TODO,
  UPDATE_TODO,
} from "../constants";
import { TodoState } from "../types";
import { TodoItem } from "../../types";

const initialState: TodoState = {
  data: [],
  loading: false,
  message: "",
};

export const TodoItemAtom = atom<TodoState>(initialState);

export const fetchState = atom<number>(1);

export const fetchAsyncTodosAction = atom(async (get) => {
  const response = await fetchTodo();
  return response.data;
});

export const fetchAsyncTodoAction = atom(
  async (get) => {
    const response = await fetchTodo(get(fetchState));
    return [].concat(response.data);
  },
  (get, set, payload: number) => {
    set(fetchState, payload);
  }
);

// react-query
export const fetchAsyncJotaiWithReactQueryTodoAction = atomWithQuery((get) => ({
  queryKey: ["users", get(fetchState)],
  queryFn: async ({ queryKey: [, id] }) => {
    const response = await fetchTodo(id);
    return [].concat(response.data);
  },
}));

export const createState = atom({});

export const createAsyncTodoAction = atom(
  async (get) => {
    const response = await createTodo(get(createState));
    return [].concat(response.data);
  },
  (get, set, payload: TodoItem) => {
    set(createState, payload);
  }
);

export const updateState = atom({
  id: 1,
  todoItem: {} as TodoItem,
});

export const updateAsyncTodoAction = atom(
  async (get) => {
    const { id, todoItem } = get(updateState);
    const response = await updateTodo(id, todoItem);
    return {
      id,
      data: response.data,
    };
  },
  (get, set, payload: any) => {
    set(updateState, payload);
  }
);

export const deleteState = atom<number>(1);

export const deleteAsyncTodoAction = atom(
  async (get) => {
    const id = get(deleteState);
    await deleteTodo(id);
    return id;
  },
  (get, set, payload: number) => {
    set(deleteState, payload);
  }
);

export const todoListFilterState = atom("FETCH_TODOS");

export const filteredTodoListState = atom((get) => {
  const filter = get<string>(todoListFilterState);
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
});

export const todoItemLengthState = selectAtom(TodoItemAtom, (todoItem) => {
  return todoItem.data.length;
});
