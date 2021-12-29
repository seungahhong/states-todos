import axios from "axios";

export const fetchTodo = async (id) => {
  return await axios.get(
    `https://jsonplaceholder.typicode.com/todos${id ? "/" + id : ""}`
  );
};

export const createTodo = (todo) => {
  const params = {
    ...todo,
  };

  return axios.post("https://jsonplaceholder.typicode.com/posts", params);
};

export const updateTodo = (id, todo) => {
  const params = {
    ...todo,
  };

  return axios.put(`https://jsonplaceholder.typicode.com/posts/${id}`, params);
};

export const patchTodo = (id, todo) => {
  const params = {
    ...todo,
  };

  return axios.patch(
    `https://jsonplaceholder.typicode.com/posts/${id}`,
    params
  );
};

export const deleteTodo = (id) => {
  return axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
};
