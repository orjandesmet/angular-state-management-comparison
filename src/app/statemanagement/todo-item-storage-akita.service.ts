import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { FakeBackendService } from '../data/fake-backend.service';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { TodoItem } from '../model/todo-item';
import { TodoItemStorage } from '../service/todo-item-storage';
import { TodoItemsQuery } from './state/todo-items.query';
import { TodoItemsStore } from './state/todo-items.store';

@Injectable({
  providedIn: 'root'
})
export class TodoItemStorageAkitaService implements TodoItemStorage {
  filter$: Observable<ItemFilter> = this.query.filter$;
  sort$: Observable<ItemSort> = this.query.sort$;
  allItems$: Observable<TodoItem[]> = this.query.selectFilteredAndSortedItems();

  constructor(
    private backend: FakeBackendService,
    private store: TodoItemsStore,
    private query: TodoItemsQuery,
  ) { }

  loadItems(): void {
    if (this.query.getSnapshot().loading) {
      this.backend.getAll().subscribe(items => {
        this.store.set(items);
      });
    }
  }
  getItem(id: string): Observable<TodoItem> {
    return this.query.selectItemById(id);
  }
  addItem(item: Partial<TodoItem>): void {
    this.backend.addOne(item).subscribe(addedItem => {
      this.store.add(addedItem);
    });
  }
  removeItem(id: string): void {
    this.backend.removeOne(id).subscribe(removedId => {
      this.store.remove(id);
    });
  }
  toggleItemCompleted(id: string): void {
    const completedDateTime = convertDateToSeconds(new Date());
    this.backend.toggleCompleted(id, completedDateTime).subscribe(updatedItem => {
      this.store.createOrReplace(id, updatedItem);
    });
  }
  setSortField(field: string): void {
    this.store.setSortField(field);
  }
  setFilter(filter: ItemFilter): void {
    this.store.setFilter(filter);
  }
}
