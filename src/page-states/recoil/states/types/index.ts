import { TodoItem } from '../../types';

export interface TodoState {
  todoItem: TodoItemState[],
  loading: boolean,
  message: string,
}

export type TodoItemState = TodoItem;