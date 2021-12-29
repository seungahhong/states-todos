import { useQuery } from "react-query";
import { fetcher, fetchTodos } from "../services";

export const useFetchTodo = ({ id, suspense } ) => {
  const { data, error } = useQuery(fetchTodos(id), () => fetcher(fetchTodos(id)), { suspense: !!suspense, useErrorBoundary: true });

  return {
    data,
    isLoading: !data && !error,
    error,
  }
}