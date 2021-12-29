import { Selector } from 'react-redux';
import { createSelector } from 'reselect';

import { TodoState } from '../store/types';

export const getTodoItem = (state: TodoState) => state.todoItem;

// export const getIncreaseNumber: Selector<TodoState, number> = createSelector(
//   getNumber,
//   getDiff,
//   (number, diff) => number + diff,
// );

// export const getDecreaseNumber: Selector<TodoState, number> = createSelector(
//   getNumber,
//   getDiff,
//   (number, diff) => number - diff,
// );
