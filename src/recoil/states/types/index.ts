import { TodoItem } from '../../types';

export interface TodoState {
  data: TodoItemState[],
  loading: boolean,
  message: string,
}

export type TodoItemState = TodoItem;