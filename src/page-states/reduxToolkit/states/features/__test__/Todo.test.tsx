import thunk from "redux-thunk";
import configureStore from "redux-mock-store";
import MockAdapter from "axios-mock-adapter";
import axios from "axios";

import {
  FETCH_TODO,
  CREATE_TODO,
  UPDATE_TODO,
  DELETE_TODO,
} from "../../constants";

import reducer, {
  fetchAsyncTodoAction,
  fetchTodoAction,
  createAsyncTodoAction,
  createTodoAction,
  updateAsyncTodoAction,
  updateTodoAction,
  deleteAsyncTodoAction,
  deleteTodoAction,
} from "../";

import { TodoItemState } from '../../types';

describe("action creator test", () => {
  it("shoud fetch an action to todo a states", () => {
    const expectedAction = {
      type: FETCH_TODO,
      payload: {
        todoItem: [
          {
            userId: 1,
            id: 1,
            title: "test",
            completed: false,
          }
        ],
      },
    };

    expect(
      fetchTodoAction([{
        userId: 1,
        id: 1,
        title: "test",
        completed: false,
      }])
    ).toEqual(expectedAction);
  });

  it("shoud create an action to todo a states", () => {
    const expectedAction = {
      type: CREATE_TODO,
      payload: {
        todoItem: [{
          userId: 1,
          id: 1,
          title: "test",
          completed: false,
        }],
      },
    };

    expect(
      createTodoAction([{
        userId: 1,
        id: 1,
        title: "test",
        completed: false,
      }])
    ).toEqual(expectedAction);
  });

  it("shoud update an action to todo a states", () => {
    const expectedAction = {
      type: UPDATE_TODO,
      payload: {
        id: 1,
        todoItem: [{
          userId: 1,
          id: 1,
          title: "test",
          completed: false,
        }],
      },
    };

    expect(
      updateTodoAction(1, [{
        userId: 1,
        id: 1,
        title: "test",
        completed: false,
      }])
    ).toEqual(expectedAction);
  });

  it("shoud delete an action to todo a states", () => {
    const expectedAction = {
      type: DELETE_TODO,
      payload: 1,
    };

    expect(deleteTodoAction(1)).toEqual(expectedAction);
  });
});

const middlewares = [thunk];
const mockStore = configureStore(middlewares);
const mock = new MockAdapter(axios);

describe("async actions test", () => {
  it("shoud async fetch action to todos a states", async () => {
    const todoItem = [
      {
        userId: 1,
        id: 1,
        title: "delectus aut autem",
        completed: false,
      },
      {
        userId: 2,
        id: 2,
        title: "delectus aut autem test",
        completed: false,
      },
    ];

    const store = mockStore();

    mock
      .onGet("https://jsonplaceholder.typicode.com/todos")
      .reply(200, todoItem);

    return store.dispatch(fetchAsyncTodoAction()).then(() => {
      // return of async actions
      // [0]: pending, [1]: FETCH_TODO, [2]: fulfilled
      const responses = store.getActions();
      const fetchAction = responses.filter(
        (item) => item.type === FETCH_TODO
      )[0];

      expect(fetchAction.payload.todoItem).toHaveLength(todoItem.length);
    });
  });

  it("shoud async fetch action to todo a states", async () => {
    const id = 1;
    const todoItem = [
      {
        userId: 1,
        id: id,
        title: "delectus aut autem",
        completed: false,
      },
    ];

    const store = mockStore();

    mock
      .onGet(`https://jsonplaceholder.typicode.com/todos/${id}`)
      .reply(200, todoItem);

    return store.dispatch(fetchAsyncTodoAction(id)).then(() => {
      // return of async actions
      // [0]: pending, [1]: FETCH_TODO, [2]: fulfilled
      const expectedActions = {
        type: FETCH_TODO,
        payload: {
          todoItem,
        },
      };

      const responses = store.getActions();
      const fetchAction = responses.filter(
        (item) => item.type === FETCH_TODO
      )[0];

      expect(fetchAction).toEqual(expectedActions);
    });
  });

  it("shoud async create action to todo a states", async () => {
    const todoItem = [
      {
        userId: 2,
        title: "create",
        body: "post create",
      },
    ];

    const store = mockStore();

    mock
      .onPost(`https://jsonplaceholder.typicode.com/posts`)
      .reply(201, todoItem);

    return store.dispatch(createAsyncTodoAction(todoItem[0])).then(() => {
      // return of async actions
      // [0]: pending, [1]: CREATE_TODO, [2]: fulfilled
      const expectedActions = {
        type: CREATE_TODO,
        payload: {
          todoItem,
        },
      };

      const responses = store.getActions();
      const fetchAction = responses.filter(
        (item) => item.type === CREATE_TODO
      )[0];

      expect(fetchAction).toEqual(expectedActions);
    });
  });

  it("shoud async update action to todo a states", async () => {
    const id = 1;
    const todoItem = {
      userId: id,
      id: id,
      title: "update",
      body: "put update",
    };

    const store = mockStore({
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    });

    mock
      .onPut(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .reply(200, todoItem);

    return store
      .dispatch(
        updateAsyncTodoAction({
          id,
          todoItem,
        })
      )
      .then(() => {
        // return of async actions
        // [0]: pending, [1]: UPDATE_TODO, [2]: fulfilled
        const expectedActions = {
          type: UPDATE_TODO,
          payload: {
            id,
            todoItem,
          },
        };

        const responses = store.getActions();
        const fetchAction = responses.filter(
          (item) => item.type === UPDATE_TODO
        )[0];

        expect(fetchAction).toEqual(expectedActions);
      });
  });

  it("shoud async delete action to todo a states", async () => {
    const id = 1;

    const store = mockStore({
      userId: 1,
      id: 1,
      title:
        "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
      body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
    });

    mock
      .onDelete(`https://jsonplaceholder.typicode.com/posts/${id}`)
      .reply(200);

    return store.dispatch(deleteAsyncTodoAction(id)).then(() => {
      // return of async actions
      // [0]: pending, [1]: DELETE_TODO, [2]: fulfilled

      const responses = store.getActions();
      const fetchAction = responses.filter(
        (item) => item.type === DELETE_TODO
      )[0];

      expect(fetchAction.payload).toBe(id);
    });
  });
});

describe("reducer test", () => {
  it("should return the initial state", () => {
    expect(reducer(undefined, {})).toEqual({
      todoItem: [],
      loading: false,
      message: "",
    });
  });

  it("should handle FETCH_TODO", () => {
    expect(
      reducer(
        {
          todoItem: [
            {
              userId: 0,
              id: 0,
              title: "init",
              completed: false,
            },
          ],
          loading: false,
          message: "",
        },
        fetchTodoAction([
          {
            userId: 1,
            id: 1,
            title: "test",
            completed: false,
          },
        ])
      )
    ).toEqual({
      todoItem: [
        {
          userId: 1,
          id: 1,
          title: "test",
          completed: false,
        },
      ],
      loading: false,
      message: "",
    });
  });

  it("should handle CREATE_TODO", () => {
    expect(
      reducer(
        {
          todoItem: [],
          loading: false,
          message: "",
        },
        createTodoAction({
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        })
      )
    ).toEqual({
      todoItem: [
        {
          userId: 1,
          id: 1,
          title:
            "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
          body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
        },
      ],
      loading: false,
      message: "",
    });
  });

  it("should handle UPDATE_TODO", () => {
    expect(
      reducer(
        {
          todoItem: [
            {
              userId: 1,
              id: 1,
              title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              body: "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto",
            },
          ],
          loading: false,
          message: "",
        },
        updateTodoAction(1, {
          id: 1,
          userId: 1,
          title: "update title",
          body: "update body",
        })
      )
    ).toEqual({
      todoItem: [
        {
          userId: 1,
          id: 1,
          title: "update title",
          body: "update body",
        },
      ],
      loading: false,
      message: "",
    });
  });

  it("should handle DELETE_TODO", () => {
    expect(
      reducer(
        {
          todoItem: [
            {
              userId: 1,
              id: 1,
              title:
                "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
              completed: false,
            },
          ] as TodoItemState[],
          loading: false,
          message: "",
        },
        deleteTodoAction(1)
      )
    ).toEqual({
      todoItem: [],
      loading: false,
      message: "",
    });
  });
});
