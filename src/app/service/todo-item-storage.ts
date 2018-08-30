import { InjectionToken } from '@angular/core';
import { Observable } from 'rxjs';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { TodoItem } from '../model/todo-item';

export interface TodoItemStorage {

  filter$: Observable<ItemFilter>;
  sort$: Observable<ItemSort>;
  allItems$: Observable<TodoItem[]>;

  loadItems(): void;
  getItem(id: string): Observable<TodoItem>;
  addItem(item: Partial<TodoItem>): void;
  removeItem(id: string): void;
  toggleItemCompleted(id: string): void;
  setSortField(field: string): void;
  setFilter(filter: ItemFilter): void;
}

export const TODO_ITEM_STORAGE = new InjectionToken<TodoItemStorage>('todo.item.storage');
