import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { FakeBackendService } from '../data/fake-backend.service';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { TodoItem } from '../model/todo-item';
import { TodoItemStorage } from '../service/todo-item-storage';
import { SetFilter } from './filter.actions';
import { SetSort } from './sort.actions';
import { selectFilter, selectFilteredAndSortedItems, selectItemById, selectSort } from './storage-selectors';
import { AddTodoItem, DeleteTodoItem, FetchTodoItems, UpdateTodoItem } from './todo-item.actions';
import * as fromTodoItem from './todo-item.reducer';

@Injectable({
  providedIn: 'root'
})
export class TodoItemStorageNgrxService implements TodoItemStorage {
  filter$: Observable<ItemFilter> = this.store.select(selectFilter);
  sort$: Observable<ItemSort> = this.store.select(selectSort);
  allItems$: Observable<TodoItem[]> = this.store.select(selectFilteredAndSortedItems);

  constructor(
    private backend: FakeBackendService,
    private store: Store<fromTodoItem.State>,
  ) { }

  loadItems(): void {
    return this.store.dispatch(new FetchTodoItems());
  }
  getItem(id: string): Observable<TodoItem> {
    return this.store.select(selectItemById(id));
  }
  addItem(item: Partial<TodoItem>): void {
    this.backend.addOne(item).subscribe(addedItem => {
      this.store.dispatch(new AddTodoItem({ todoItem: addedItem }));
    });
  }
  removeItem(id: string): void {
    this.backend.removeOne(id).subscribe(removedId => {
      this.store.dispatch(new DeleteTodoItem({ id: removedId }));
    });
  }
  toggleItemCompleted(id: string): void {
    const completedDateTime = convertDateToSeconds(new Date());
    this.backend.toggleCompleted(id, completedDateTime).subscribe(updatedItem => {
      this.store.dispatch(new UpdateTodoItem({ todoItem: { id, changes: updatedItem } }));
    });
  }
  setSortField(field: string): void {
    this.store.dispatch(new SetSort({ field }));
  }
  setFilter(filter: ItemFilter): void {
    this.store.dispatch(new SetFilter({ filter }));
  }
}
