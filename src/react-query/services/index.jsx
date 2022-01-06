import axios from "axios";
import { GET_URL, POST_URL } from "../constants";

export const fetcher = (args) => {
  return axios.get(args);
};

export const fetchTodos = (id) => `${GET_URL}${id ? `/${id}` : ""}`;

export const createTodo = (todo) => {
  const params = {
    ...todo,
  };

  return axios.post(`${POST_URL}`, params);
};

export const updateTodo = (id, todo) => {
  const params = {
    ...todo,
  };

  return axios.put(`${POST_URL}/${id}`, params);
};

export const patchTodo = (id, todo) => {
  const params = {
    ...todo,
  };

  return axios.patch(`${POST_URL}/${id}`, params);
};

export const deleteTodo = (id) => {
  return axios.delete(`${POST_URL}/${id}`);
};
