import { Injectable } from '@angular/core';
import { action, EntityState, EntityStore, getInitialEntitiesState, StoreConfig } from '@datorama/akita';
import { ItemFilter } from '../../model/item-filter.enum';
import { ItemSort } from '../../model/item-sort';
import { TodoItem } from './todo-item.model';

export interface TodoItemsState extends EntityState<TodoItem> {
  filter: ItemFilter;
  sort: ItemSort;
}

export const initialTodoItemsState: TodoItemsState = {
  ...getInitialEntitiesState(),
  sort: { field: 'name', ascending: true },
  filter: ItemFilter.ALL,
};

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'todoItems' })
export class TodoItemsStore extends EntityStore<TodoItemsState, TodoItem> {

  constructor() {
    super(initialTodoItemsState);
  }

  @action({ type: '[Sort] Set Sort' })
  setSortField(field: string): void {
    this.setState(state => ({
      ...state,
      sort: {
        ...state.sort,
        field,
        ascending: state.sort.field === field ? !state.sort.ascending : true,
      }
    }));
  }

  @action({ type: '[Filter] Set Filter' })
  setFilter(filter: ItemFilter): void {
    this.setState(state => ({
      ...state,
      filter,
    }));
  }

}

