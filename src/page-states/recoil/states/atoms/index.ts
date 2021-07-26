import { atom, selector, selectorFamily } from 'recoil';
import { fetchTodo } from '../../../reduxToolkit/services';
import { TodoState } from '../types';

const initialState: TodoState = {
    todoItem: [],
    loading: false,
    message: '',
};

export const TodoItemAtom = atom<TodoState>({
    key: 'TodoItemState',
    default: initialState,
});

export const TodoItemSelector = selector<TodoState>({
    key: 'TodoItemSelector',
    get: ({get}) => get(TodoItemAtom),
    set: ({set}, newValue) => set(TodoItemAtom, newValue),
});

// export const fetchAsyncTodoAction = selector({
//     key: 'fetchAsyncTodoAction',
//     get: ({get}) => get(TodoItemSelector),
//     set: async ({set}, newValue) => {
//         const response = await fetchTodo(newValue);
//         set(TodoItemSelector, { todoItem: response.data, loading: false, message: '' });
//     },
// });

export const fetchAsyncTodoAction = selectorFamily({
    key: 'fetchAsyncTodoAction',
    get: (args) => async ({get}) => {
        const response = await fetchTodo(args);
        return response.data;
    },
});

// const tempFahrenheit = atom({
//     key: 'tempFahrenheit',
//     default: 32,
//   });
  

// export const tempCelcius = selector({
//     key: 'tempCelcius',
//     get: ({get}) => ((get(tempFahrenheit) - 32) * 5) / 9,
//     set: ({set}, newValue) =>
//       set(
//         tempFahrenheit,
//         newValue instanceof DefaultValue ? newValue : (newValue * 9) / 5 + 32,
//       ),
//   });
  