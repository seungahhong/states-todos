import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import ReactLoading from 'react-loading';
import {  TodoItemAtom, fetchAsyncTodoAction } from '../states/atoms';

import TodosContentItemComponent from "../components/TodosContentItemComponent";

const TodoContentContainer = () => {
  const [{ todoItem, loading, message }, setTodoItemAtom] = useRecoilState(TodoItemAtom);
  const fetchTodo = useRecoilValue(fetchAsyncTodoAction(undefined));

  const [ fetchNumber, setFetchNumber ] = useState(1);
  const [ updateNumber, setUpdateNumber ] = useState(1);
  const [ deleteNumber, setDeleteNumber ] = useState(1);

  useEffect(() => {
    setTodoItemAtom(prev => ({
      ...prev,
      todoItem: fetchTodo,
    }));
  }, []);

  // const handleFetchTodosAction = (event: React.MouseEvent<HTMLButtonElement>) => dispatch(fetchAsyncTodoAction());
  // const handleFetchTodoAction = (evetn: React.MouseEvent<HTMLButtonElement>) => dispatch(fetchAsyncTodoAction(fetchNumber));
  // const handleCreateTodoAction = (event: React.MouseEvent<HTMLButtonElement>) => dispatch(createAsyncTodoAction({
  //   'userId': 2,
  //   'title': 'create',
  //   'completed': false,
  // }));
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
  
  const onFetchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setFetchNumber(Number(target.value));
  }, []);

  const onUpdateChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setUpdateNumber(Number(target.value));
  }, []);

  const onDeleteChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    setDeleteNumber(Number(target.value));
  }, []);

  return (
    <>
      {
        loading ? <ReactLoading color={'#00b2b2'} height={50} width={50} /> : <h1>{message}</h1>
      }
      <div>
        <button style={{ background: '#e7f9f9' }} >Todos All Loading</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <label>Todo Fetch : </label><input type="number" value={fetchNumber} onChange={onFetchChange} />
      <div>
        <button style={{ background: '#e7f9f9' }}>Todo Loading</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <div>
        <button style={{ background: '#e7f9f9' }}>Create Todo</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <label>Todo Update : </label><input type="number" value={updateNumber} onChange={onUpdateChange} />
      <div>
        <button style={{ background: '#e7f9f9' }}>Update Todo</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <label>Todo Delete : </label><input type="number" value={deleteNumber} onChange={onDeleteChange} />
      <div>
        <button style={{ background: '#e7f9f9' }}>Delete Todo</button>
      </div>
      {
        (!loading && todoItem) && todoItem.map(
          todo => 
            <TodosContentItemComponent
              key={todo.id}
              id={todo.id}
              userId={todo.userId}
              title={todo.title}
              completed={todo.completed}
          />)
      }
    </>
  );
};

export default TodoContentContainer;
