import { createSelector } from '@ngrx/store';
import { sortAndFilterData } from '../model/todo-item.functions';
import * as fromTodoItem from './todo-item.reducer';

export const selectFilter = createSelector(fromTodoItem.selectTodoItemState, state => state.filter);
export const selectSort = createSelector(fromTodoItem.selectTodoItemState, state => state.sort);

export const selectItemById = (id: string) => createSelector(fromTodoItem.selectEntities, entities => entities[id]);

export const selectFilteredAndSortedItems = createSelector(fromTodoItem.selectAll, selectFilter, selectSort, (items, filter, sort) => {
  return sortAndFilterData(items, filter, sort);
});
