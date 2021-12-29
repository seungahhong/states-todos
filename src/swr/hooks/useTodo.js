import useSWR from "swr";
import { fetcher, fetchTodos } from "../services";

export const useFetchTodo = ({ id, suspense } ) => {
  const { data, error } = useSWR(fetchTodos(id), fetcher, { suspense: !!suspense });

  return {
    data,
    isLoading: !data && !error,
    error,
  }
}