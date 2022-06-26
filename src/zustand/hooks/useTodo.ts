import create from "zustand";
import produce from "immer";
import { subscribeWithSelector, devtools } from "zustand/middleware";
import { fetchTodo } from "../services";
import { immer } from "zustand/middleware/immer";
import { TodoState } from "../types";

export const useStore = create<TodoState>()(
  devtools(
    subscribeWithSelector(
      immer((set) => ({
        todo: {
          todoItems: [],
          loading: true,
          error: false,
        },
        fetchTodos: async () => {
          set((state) => {
            state.todo.loading = true;
          });

          try {
            const response = await fetchTodo();
            set((state) => {
              state.todo.loading = false;
              state.todo.todoItems = [].concat(response.data);
            });
          } catch (e) {
            set((state) => {
              state.todo.loading = false;
              state.todo.error = e;
            });
          }
        },
        fetchTodo: async (id: number) => {
          set((state) => {
            return produce(state, (draft) => {
              draft.todo.loading = true;
            });
          });

          try {
            const response = await fetchTodo(id);
            set((state) => {
              return produce(state, (draft) => {
                draft.todo.loading = false;
                draft.todo.todoItems = [].concat(response.data);
              });
            });
          } catch (e) {
            set((state) =>
              produce(state, (draft) => {
                draft.todo.loading = false;
                draft.todo.error = e;
              })
            );
          }
        },
      }))
    )
  )
);
