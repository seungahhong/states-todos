import { AxiosResponse } from "axios";
import { makeObservable, observable, action, runInAction, flow } from "mobx";
import {
  fetchTodo,
} from '../../services';

export interface TodoState {
  todoItem: TodoItemState[],
  loading: boolean,
  message: string,
}

export interface TodoItem {
  id?: number,
  userId: number,
  title: string,
  completed: boolean,
};

export type TodoItemState = TodoItem;

const initialState: TodoState = {
  todoItem: [],
  loading: false,
  message: '',
};

class TodosStore {
  @observable store: TodoState = initialState;

  constructor() {
    makeObservable(this);
  }

  @action
  fetchAsyncTodoAction(args: number | undefined) {
    this.store.loading = true;
    return fetchTodo(args).then(
      this.fetchTodoSuccess.bind(this),
      this.fetchTodoError.bind(this),
    )
  }

  @action.bound
  fetchTodoSuccess(res: AxiosResponse) {
    const { data : todoItem } = res;
    this.store.loading = false;
    this.store.todoItem = Array.isArray(todoItem) ? todoItem : [].concat(todoItem);
    this.store.message = '성공했습니다...';
  }

  @action.bound
  fetchTodoError() {
    this.store.loading = false;
    this.store.message = '실패했습니다...';
  }

  @action
  fetchAsyncRunInActionTodoAction = async (args: number | undefined) => {
    try {
      this.store.loading = true;
      const res = await fetchTodo(args);
      runInAction(() => {
        const { data : todoItem } = res;
        this.store.loading = false;
        this.store.todoItem = Array.isArray(todoItem) ? todoItem : [].concat(todoItem);
        this.store.message = '성공했습니다...';
      });

    } catch(e) {
      runInAction(() => {
        this.store.loading = false;
        this.store.message = '실패했습니다...';
      });
    }
  }

  @flow
  *fetchAsyncFlowTodoAction(args: number | undefined) {
    try {
      this.store.loading = true;
      const res: AxiosResponse<TodoItemState[]> = yield fetchTodo(args);

      const { data : todoItem } = res;
      this.store.loading = false;
      this.store.todoItem = Array.isArray(todoItem) ? todoItem : ([] as TodoItemState[]).concat(todoItem);
      this.store.message = '성공했습니다...';
    } catch(e) {
      this.store.loading = false;
      this.store.message = '실패했습니다...';
    }
  }
}

export default TodosStore;