import axios from "axios";
import { TodoItem } from "../types";

export const fetchTodo = async (id: undefined | number) => {
  return await axios.get<TodoItem | TodoItem[]>(
    `https://jsonplaceholder.typicode.com/todos${id ? "/" + id : ""}`
  );
};

export const createTodo = (todo: TodoItem) => {
  const params = {
    ...todo,
  };

  return axios.post<TodoItem>("https://jsonplaceholder.typicode.com/posts", params);
};

export const updateTodo = (id: undefined | number, todo: TodoItem) => {
  const params = {
    ...todo,
  };

  return axios.put<TodoItem>(`https://jsonplaceholder.typicode.com/posts/${id}`, params);
};

export const patchTodo = (id: undefined | number, todo: TodoItem) => {
  const params = {
    ...todo,
  };

  return axios.patch<TodoItem>(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    params
  );
};

export const deleteTodo = (id: undefined | number) => {
  return axios.delete<TodoItem>(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
