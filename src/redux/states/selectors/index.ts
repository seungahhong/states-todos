import { Selector } from 'react-redux';
import { createSelector } from 'reselect';

import { TodoState, RootState } from '../store/types';

/**
 * createSelector
 */
const getTodo = (state: RootState) => state.todos;
export const getTodoItemLengthState: Selector<RootState, number> = createSelector(
  getTodo,
  (state: TodoState) => state.todoItem.length,
);
