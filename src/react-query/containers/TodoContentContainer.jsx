import React, { useCallback, useEffect, useRef, useState } from "react";
import { useMutation, useQueryClient } from "react-query";

import { GET_URL } from "../constants";
import { useFetchTodo } from "../hooks/useTodo";
import TodosContentItemComponent from "../components/TodosContentItemComponent";
import { createTodo } from "../services";

const TodoContentContainer = () => {
  // const { data: response } = useQuery(['todos'], fetchTodos, { suspense: true, useErrorBoundary: true });
  // const { data: response1 } = useQuery(['todo1'], fetchTodo1, { suspense: true, useErrorBoundary: true });
  const [fetchNumber, setFetchNumber] = useState(1);
  const [todoItem, setTodoItem] = useState([]);
  const filterRef = useRef({
    type: "FETCH_TODOS",
    number: 1,
  });
  const queryClient = useQueryClient();
  const todosData = useFetchTodo({
    id: filterRef.current.type !== "FETCH_TODOS" && filterRef.current.number,
    suspense: true,
  }); // error에 대해서 옵션 선택 없이 errorboundary로 처리가능
  const createMutation = useMutation(createTodo, {
    onSuccess: (data) => {
      filterRef.current = {
        type: "CREATE_TODO",
        number: fetchNumber,
      };
      queryClient.setQueriesData([GET_URL, fetchNumber], data);
    },
  });

  // const todosData = useFetchTodo({ id: fetchNumber, suspense: true }); // error에 대해서 옵션 선택 없이 errorboundary로 처리가능

  // const [ updateNumber, setUpdateNumber ] = useState(1);
  // const [ deleteNumber, setDeleteNumber ] = useState(1);

  useEffect(() => {
    setTodoItem(
      Array.isArray(todosData.data?.data)
        ? todosData.data?.data
        : [].concat(todosData.data?.data)
    );
  }, [todosData.data.data]);

  const handleFetchTodosAction = (event) => {
    filterRef.current.type = "FETCH_TODOS";
    queryClient.invalidateQueries([GET_URL]);
  };

  const handleFetchTodoAction = (event) => {
    filterRef.current = {
      type: "FETCH_TODO",
      number: fetchNumber,
    };
    queryClient.invalidateQueries([GET_URL]);
  };
  const handleCreateTodoAction = (event) => {
    createMutation.mutate({
      userId: fetchNumber,
      title: "create",
      completed: false,
    });
  };
  // const handleUpdateTodoAction = (event: React.MouseEvent<HTMLButtonElement>) => dispatch(updateAsyncTodoAction({
  //   id: updateNumber,
  //   todoItem: {
  //     'id': updateNumber,
  //     'userId': updateNumber,
  //     'title': 'update',
  //     'completed': false,
  //   },
  // }));
  // const handleDeteleTodoAciton = (event: React.MouseEvent<HTMLButtonElement>) => dispatch(deleteAsyncTodoAction(deleteNumber));

  const onFetchChange = useCallback((event) => {
    const { target } = event;
    setFetchNumber(Number(target.value));
  }, []);

  // const onUpdateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { target } = e;
  //   setUpdateNumber(Number(target.value));
  // }, []);

  // const onDeleteChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { target } = e;
  //   setDeleteNumber(Number(target.value));
  // }, []);

  return (
    <>
      {/* <div>길이: {todoLength}</div> */}
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
      <input type="number" value={fetchNumber} onChange={onFetchChange} />
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
      <div>
        <button
          style={{ background: "#e7f9f9" }}
          onClick={handleCreateTodoAction}
        >
          Create Todo
        </button>
      </div>
      <hr
        style={{
          margin: "3px",
          border: "1px solid black",
        }}
      />
      {/* <label>Todo Update : </label><input type="number" value={updateNumber} onChange={onUpdateChange} />
      <div>
        <button style={{ background: '#e7f9f9' }} onClick={handleUpdateTodoAction}>Update Todo</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <label>Todo Delete : </label><input type="number" value={deleteNumber} onChange={onDeleteChange} />
      <div>
        <button style={{ background: '#e7f9f9' }} onClick={handleDeteleTodoAciton}>Delete Todo</button>
      </div> */}
      {todoItem.map((todo) => (
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

export default TodoContentContainer;
