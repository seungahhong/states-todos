import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch, shallowEqual, connect } from "react-redux";
import ReactLoading from "react-loading";

import TodosContentItemComponent from "../components/TodosContentItemComponent";
import {
  TypedThunkDispath,
  RootState,
  RootDispatch,
  TodoState,
} from "../states/types";
import {
  createAsyncTodoAction,
  deleteAsyncTodoAction,
  fetchAsyncTodoAction,
  fetchTodoSagaAsyncAction,
  getTodoItemLengthState,
  updateAsyncTodoAction,
} from "../states/features";

const TodoContentContainer = (props: RootState) => {
  // const { todoItem, loading, message } : TodoState = useSelector(
  //   ( state: RootState ) => ({
  //     todoItem: props.todos.todoItem,
  //     loading: props.todos.loading,
  //     message: props.todos.message,
  //   }),
  //   shallowEqual
  // );
  const { todoItem, loading }: TodoState = useSelector(
    (state: RootState) => props.todos,
    shallowEqual
  );
  const todoLength = useSelector(getTodoItemLengthState);
  const dispatch = useDispatch<RootDispatch>();
  const [fetchNumber, setFetchNumber] = useState(1);
  const [updateNumber, setUpdateNumber] = useState(1);
  const [deleteNumber, setDeleteNumber] = useState(1);

  useEffect(() => {
    (dispatch as TypedThunkDispath)(fetchAsyncTodoAction());
  }, [dispatch]);

  const handleFetchTodosSagaAction = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => dispatch(fetchTodoSagaAsyncAction.request(undefined));
  const handleFetchTodoSagaAction = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => dispatch(fetchTodoSagaAsyncAction.request(fetchNumber));
  const handleFetchTodosAction = (event: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(fetchAsyncTodoAction());
  const handleFetchTodoAction = (evetn: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(fetchAsyncTodoAction(fetchNumber));
  const handleCreateTodoAction = (event: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(
      createAsyncTodoAction({
        userId: 2,
        title: "create",
        completed: false,
      })
    );
  const handleUpdateTodoAction = (event: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(
      updateAsyncTodoAction({
        id: updateNumber,
        todoItem: {
          id: updateNumber,
          userId: updateNumber,
          title: "update",
          completed: false,
        },
      })
    );
  const handleDeteleTodoAciton = (event: React.MouseEvent<HTMLButtonElement>) =>
    dispatch(deleteAsyncTodoAction(deleteNumber));

  const onFetchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      setFetchNumber(Number(target.value));
    },
    []
  );

  const onUpdateChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      setUpdateNumber(Number(target.value));
    },
    []
  );

  const onDeleteChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { target } = e;
      setDeleteNumber(Number(target.value));
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
      <div>
        <button
          style={{ background: "#e7f9f9" }}
          onClick={handleFetchTodosSagaAction}
        >
          Todos Saga All Loading
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
      <div>
        <button
          style={{ background: "#e7f9f9" }}
          onClick={handleFetchTodoSagaAction}
        >
          Todo Saga Loading
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
      <label>Todo Update : </label>
      <input type="number" value={updateNumber} onChange={onUpdateChange} />
      <div>
        <button
          style={{ background: "#e7f9f9" }}
          onClick={handleUpdateTodoAction}
        >
          Update Todo
        </button>
      </div>
      <hr
        style={{
          margin: "3px",
          border: "1px solid black",
        }}
      />
      <label>Todo Delete : </label>
      <input type="number" value={deleteNumber} onChange={onDeleteChange} />
      <div>
        <button
          style={{ background: "#e7f9f9" }}
          onClick={handleDeteleTodoAciton}
        >
          Delete Todo
        </button>
      </div>
      {!loading &&
        todoItem &&
        todoItem.map((todo) => (
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

const mapStateToProps = (state: RootState) => state;

export default connect(mapStateToProps)(
  React.memo(
    TodoContentContainer,
    (prev: RootState, curr: RootState) => prev.todos === curr.todos
  )
);
