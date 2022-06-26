export interface TodoItem {
  id?: number;
  userId: number;
  title: string;
  completed: boolean;
}

export interface TodoState {
  todo: {
    todoItems: TodoItem[];
    loading: boolean;
    error: any;
  };
  fetchTodos: () => void;
  fetchTodo: (id: number) => void;
}
