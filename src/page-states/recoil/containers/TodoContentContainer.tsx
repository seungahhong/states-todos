import React, { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  TodoItemAtom,
  fetchAsyncTodoAction,
  createAsyncTodoAction,
  deleteAsyncTodoAction,
  filteredTodoListState,
  todoListFilterState,
  updateAsyncTodoAction,
} from '../states/atoms';
import TodosContentItemComponent from "../components/TodosContentItemComponent";
import {
  FETCH_TODOS,
  FETCH_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../states/constants";

const TodoContentContainer = () => {
  const [{ data: todoItems }, setTodoItemAtom] = useRecoilState(TodoItemAtom);
  const [ filter, setTodoFilter ] = useRecoilState(todoListFilterState);
  const filterItems = useRecoilValue(filteredTodoListState);

  const fetchTodoAction = useSetRecoilState(fetchAsyncTodoAction);
  const createTodoAction = useSetRecoilState(createAsyncTodoAction);
  const updateTodoAction = useSetRecoilState(updateAsyncTodoAction);
  const deleteTodoAction = useSetRecoilState(deleteAsyncTodoAction);
  
  const [ fetchNumber, setFetchNumber ] = useState(1);
  const [ updateNumber, setUpdateNumber ] = useState(1);
  const [ deleteNumber, setDeleteNumber ] = useState(1);

  useEffect(() => {
    switch(filter) {
      case FETCH_TODOS:
      case FETCH_TODO:  
        setTodoItemAtom((prev) => ({
          ...prev,
          data: filterItems,
        }));
        break;
      case CREATE_TODO:
        setTodoItemAtom((prev) => ({
          ...prev,
          data: [...prev.data, ...filterItems],
        }));
        break;
      case UPDATE_TODO:
        setTodoItemAtom((prev) => ({
          ...prev,
          data: prev.data.map(todo => todo.id !== filterItems.id ? todo : filterItems.data),
        }));
        break;  
      case DELETE_TODO:
        setTodoItemAtom((prev) => ({
          ...prev,
          data: prev.data.filter((item) => item.id !== filterItems),
        }));
        break;  
    }
  }, [filterItems, setTodoItemAtom]);

  const handleFetchTodosAction = (evetn: React.MouseEvent<HTMLButtonElement>) => {
    setTodoFilter('FETCH_TODOS');
  };

  const handleFetchTodoAction = (evetn: React.MouseEvent<HTMLButtonElement>) => {
    fetchTodoAction(fetchNumber);
    setTodoFilter('FETCH_TODO');
  };

  const handleCreateTodoAction = (evetn: React.MouseEvent<HTMLButtonElement>) => {
    createTodoAction({
      userId: 2,
      title: 'create',
      completed: false,
    })
    setTodoFilter('CREATE_TODO');
  };

  const handleUpdateTodoAction = (evetn: React.MouseEvent<HTMLButtonElement>) => {
    updateTodoAction({
      id: updateNumber,
      todoItem: {
        id: updateNumber,
        userId: updateNumber,
        title: 'update',
        completed: false,
      },
    })
    setTodoFilter('UPDATE_TODO');
  };

  const handleDeleteTodoAction = (evetn: React.MouseEvent<HTMLButtonElement>) => {
    deleteTodoAction(deleteNumber);
    setTodoFilter('DELETE_TODO');
  };

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
      <div>
        <button style={{ background: '#e7f9f9' }} onClick={handleFetchTodosAction}>Todos All Loading</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <label>Todo Fetch : </label><input type="number" value={fetchNumber} onChange={onFetchChange} />
      <div>
        <button style={{ background: '#e7f9f9' }} onClick={handleFetchTodoAction}>Todo Loading</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <div>
        <button style={{ background: '#e7f9f9' }} onClick={handleCreateTodoAction}>Create Todo</button>
      </div>
      <hr 
        style={{
          margin: '3px',
          border: '1px solid black',
        }}
      />
      <label>Todo Update : </label><input type="number" value={updateNumber} onChange={onUpdateChange} />
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
        <button style={{ background: '#e7f9f9' }} onClick={handleDeleteTodoAction}>Delete Todo</button>
      </div>
      {
        todoItems && todoItems.map(
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
