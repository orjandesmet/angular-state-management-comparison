import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FakeBackendService } from '../data/fake-backend.service';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { TodoItem } from '../model/todo-item';
import { TodoItemStorage } from '../service/todo-item-storage';
import { SetFilter } from './state/filter.actions';
import { SetSort } from './state/sort.actions';
import { AddTodoItem, DeleteTodoItem, FetchTodoItems, UpdateTodoItem } from './state/todo-items.actions';
import { TodoItemsState } from './state/todo-items.state';

@Injectable({
  providedIn: 'root'
})
export class TodoItemStorageNgxsService implements TodoItemStorage {

  @Select(TodoItemsState.selectFilter)
  filter$: Observable<ItemFilter>;

  @Select(TodoItemsState.selectSort)
  sort$: Observable<ItemSort>;

  @Select(TodoItemsState.selectFilteredAndSortedItems)
  allItems$: Observable<TodoItem[]>;

  constructor(
    private store: Store,
    private backend: FakeBackendService,
  ) { }

  loadItems(): void {
    this.store.dispatch(new FetchTodoItems());
  }
  getItem(id: string): Observable<TodoItem> {
    return this.store.select(TodoItemsState.selectItemById(id));
  }
  addItem(item: Partial<TodoItem>): void {
    this.backend.addOne(item).subscribe(addedItem => {
      this.store.dispatch(new AddTodoItem(addedItem));
    });
  }
  removeItem(id: string): void {
    this.backend.removeOne(id).subscribe(removedId => {
      this.store.dispatch(new DeleteTodoItem(removedId));
    });
  }
  toggleItemCompleted(id: string): void {
    const completedDateTime = convertDateToSeconds(new Date());
    this.backend.toggleCompleted(id, completedDateTime).subscribe(updatedItem => {
      this.store.dispatch(new UpdateTodoItem({id, changes: updatedItem}));
    });
  }
  setSortField(field: string): void {
    this.store.dispatch(new SetSort(field));
  }
  setFilter(filter: ItemFilter): void {
    this.store.dispatch(new SetFilter(filter));
  }
}
