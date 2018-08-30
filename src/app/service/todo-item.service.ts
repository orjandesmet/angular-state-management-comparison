import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { TodoItem } from '../model/todo-item';
import { TodoItemStorage, TODO_ITEM_STORAGE } from './todo-item-storage';

@Injectable({
  providedIn: 'root'
})
export class TodoItemService {

  todoItems$: Observable<TodoItem[]> = this.storage.allItems$;
  sort$: Observable<ItemSort> = this.storage.sort$;
  filter$: Observable<string> = this.storage.filter$.pipe(map(
    filter => {
      switch (filter) {
        case ItemFilter.COMPLETE:
          return 'complete';
        case ItemFilter.INCOMPLETE:
          return 'incomplete';
        case ItemFilter.ALL:
        default:
          return 'all';
      }
    }
  ));

  constructor(
    @Inject(TODO_ITEM_STORAGE) private storage: TodoItemStorage
  ) { }

  loadItems(): void {
    return this.storage.loadItems();
  }

  getItem(id: string): Observable<TodoItem> {
    return this.storage.getItem(id);
  }

  addItem(item: Partial<TodoItem>) {
    this.storage.addItem(item);
  }

  removeItem(id: string) {
    this.storage.removeItem(id);
  }

  toggleItemCompleted(id: string) {
    this.storage.toggleItemCompleted(id);
  }

  setSortField(field: string) {
    this.storage.setSortField(field);
  }

  setFilterString(stringValue: string) {
    switch (stringValue) {
      case 'incomplete':
        this.storage.setFilter(ItemFilter.INCOMPLETE);
        break;
      case 'complete':
        this.storage.setFilter(ItemFilter.COMPLETE);
        break;
      case 'all':
      default:
        this.storage.setFilter(ItemFilter.ALL);
        break;
    }
  }
}
