import React from "react";
import { observer, inject } from 'mobx-react';
import ReactLoading from 'react-loading';
import TodosStore, { TodoItemState } from "../states/stores/TodosStore";

import TodosContentItemComponent from "../components/TodosContentItemComponent";

type TodoStoreProps = {
  store?: TodosStore;
}

type TodoStoreState = {
  fetchNumber: number;
}

@inject('store')
@observer
class TodoContentContainer extends React.Component<TodoStoreProps, TodoStoreState> {
  static defaultProps = { 
    todosStore: TodosStore,
  };

  todosStore: TodosStore;
  constructor(props: TodoStoreProps) {
    super(props);

    this.state = {
      fetchNumber: 1,
    }

    this.todosStore = props.store!; // 접미에 붙는 느낌표(!) 연산자인 단언 연산자는 해당 피연산자가 null, undeifned가 아니라고 단언
  }

  componentDidMount() {
    this.todosStore.fetchAsyncTodoAction(undefined);
  }

  onFetchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { target } = e;
    this.setState({
      fetchNumber: Number(target.value)
    })
  };

  handleFetchTodosAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.todosStore.fetchAsyncRunInActionTodoAction(undefined);
  };
  
  handleFetchTodoAction = (event: React.MouseEvent<HTMLButtonElement>) => {
    this.todosStore.fetchAsyncRunInActionTodoAction(this.state.fetchNumber);
  };

  render() {
    const { store: todosStore } = this.props.store!;
    const { fetchNumber } = this.state;

    return (
      <>
        {
          todosStore.loading && <ReactLoading color={'#00b2b2'} height={50} width={50} />
        }
        <div>
          <button style={{ background: '#e7f9f9' }} onClick={this.handleFetchTodosAction}>Todos All Loading</button>
        </div>
        <hr 
          style={{
            margin: '3px',
            border: '1px solid black',
          }}
        />
        <label>Todo Fetch : </label><input type="number" value={fetchNumber} onChange={this.onFetchChange} />
        <div>
          <button style={{ background: '#e7f9f9' }} onClick={this.handleFetchTodoAction}>Todo Loading</button>
        </div>
        <hr 
          style={{
            margin: '3px',
            border: '1px solid black',
          }}
        />
        {/* <div>
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
          <button style={{ background: '#e7f9f9' }} onClick={handleDeteleTodoAciton}>Delete Todo</button>
        </div> */}
        {
          (!todosStore.loading && todosStore.todoItem) && todosStore.todoItem.map(
            (todo: TodoItemState) => 
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
  }
}

export default TodoContentContainer;
