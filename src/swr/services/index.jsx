import axios from "axios";
export const fetcher = (...args) => axios.get(...args);

export const fetchTodos = (id) => `https://jsonplaceholder.typicode.com/todos${id ? `/${id}` : ''}`;
