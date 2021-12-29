import React from "react";
import { useFetchTodo } from "../hooks/useTodo";
import TodosContentItemComponent from "../components/TodosContentItemComponent";

const TodoContentContainer = () => {
  // const { data: response } = useQuery(['todos'], fetchTodos, { suspense: true, useErrorBoundary: true });
  // const { data: response1 } = useQuery(['todo1'], fetchTodo1, { suspense: true, useErrorBoundary: true });
  const { data: response } = useFetchTodo({ suspense: true }); // error에 대해서 옵션 선택 없이 errorboundary로 처리가능
  const { data: response1 } = useFetchTodo({ id: 1, suspense: true }); // error에 대해서 옵션 선택 없이 errorboundary로 처리가능

  return (
    <>
      {response1?.data && (
        <TodosContentItemComponent
          key={response1?.data?.id}
          id={response1?.data?.id}
          userId={response1?.data?.userId}
          title={response1?.data?.title}
          completed={response1?.data?.completed}
        />
      )}
      {response?.data?.map((todo) => (
        <TodosContentItemComponent
          key={todo.id}
          id={todo.id}
          userId={todo.userId}
          title={todo.title}
          completed={todo.completed}
        />
      ))}
    </>
  );
};

TodoContentContainer.propTypes = {};

TodoContentContainer.defaultProps = {};

export default TodoContentContainer;
