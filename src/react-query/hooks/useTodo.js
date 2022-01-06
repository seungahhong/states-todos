import { useQuery } from "react-query";
import { fetcher, fetchTodos } from "../services";
import { GET_URL } from "../constants";

export const useFetchTodo = ({ id, suspense }) => {
  const { data, error } = useQuery(
    [GET_URL, id],
    () => fetcher(fetchTodos(id)),
    {
      suspense: !!suspense,
      useErrorBoundary: true,
    }
  );

  return {
    data,
    isLoading: !data && !error,
    error,
  };
};
