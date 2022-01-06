import { useQuery } from "react-query";
import { fetcher, fetchTodos } from "../services";
import { GET_URL } from "../constants";
import { useMemo } from "react";

export const useFetchTodo = ({ id, suspense }) => {
  const { data, error } = useQuery(
    [GET_URL, id],
    () => fetcher(fetchTodos(id)),
    {
      suspense: !!suspense,
      useErrorBoundary: true,
    }
  );

  const todoLength = useMemo(() => {
    return Array.isArray(data?.data) ? data?.data?.length : 1;
  }, [data]);

  return {
    data,
    todoLength,
    isLoading: !data && !error,
    error,
  };
};
