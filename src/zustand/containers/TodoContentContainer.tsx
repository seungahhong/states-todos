import React, { useCallback, useEffect, useState } from "react";
import ReactLoading from "react-loading";
import TodosContentItemComponent from "../components/TodosContentItemComponent";
import { useStore } from "../hooks/useTodo";

const TodoContentContainer = () => {
  const todo = useStore((state) => state.todo);
  const fetchTodo = useStore((state) => state.fetchTodo);
  const fetchTodos = useStore((state) => state.fetchTodos);
  const todoLength = useStore((state) => state.todo.todoItems.length);
  const { loading, todoItems } = todo;
  const [fetchNumber, setFetchNumber] = useState(1);

  useEffect(() => {
    // const todoLength = useMemo(() => todoItems.length, [todoItems]);
    useStore.subscribe(
      (state) => state.todo.todoItems,
      (todoItems) => console.log(todoItems.length)
    );

    return () => {
      useStore.destroy();
    };
  }, []);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleFetchTodosAction = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      fetchTodos();
    },
    [fetchTodos]
  );

  const handleFetchTodoAction = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>) => {
      fetchTodo(fetchNumber);
    },
    [fetchTodo, fetchNumber]
  );

  const handleFetchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      setFetchNumber(Number(target.value));
    },
    []
  );

  return (
    <>
      {loading && <ReactLoading color={"#00b2b2"} height={50} width={50} />}
      <div>길이: {todoLength}</div>
      <div>
        <button
          style={{ background: "#e7f9f9" }}
          onClick={handleFetchTodosAction}
        >
          Todos All Loading
        </button>
      </div>
      <hr
        style={{
          margin: "3px",
          border: "1px solid black",
        }}
      />
      <label>Todo Fetch : </label>
      <input type="number" value={fetchNumber} onChange={handleFetchChange} />
      <div>
        <button
          style={{ background: "#e7f9f9" }}
          onClick={handleFetchTodoAction}
        >
          Todo Loading
        </button>
      </div>
      <hr
        style={{
          margin: "3px",
          border: "1px solid black",
        }}
      />
      {!loading && (
        <>
          {todoItems.map((todo) => (
            <TodosContentItemComponent
              key={todo.id}
              id={todo.id}
              userId={todo.userId}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </>
      )}
    </>
  );
};

export default TodoContentContainer;
