import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { FakeBackendService } from '../data/fake-backend.service';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { TodoItem } from '../model/todo-item';
import { sortAndFilterData } from '../model/todo-item.functions';
import { TodoItemStorage } from './../service/todo-item-storage';
import { addItemOperator, removeItemOperator, updateItemOperator } from './item-operators';
import { setSortFieldOperator } from './sort-operators';

@Injectable()
export class TodoItemStorageRxJs implements TodoItemStorage {

  private filterSubj$ = new BehaviorSubject<ItemFilter>(ItemFilter.ALL);
  private sortSubj$ = new BehaviorSubject<ItemSort>({ field: 'name', ascending: true });
  private data$ = new BehaviorSubject<TodoItem[]>([]);
  filter$ = this.filterSubj$.pipe(distinctUntilChanged());
  sort$ = this.sortSubj$.pipe(distinctUntilChanged());
  allItems$: Observable<TodoItem[]> = combineLatest(this.data$.pipe(distinctUntilChanged()), this.filter$, this.sortSubj$)
    .pipe(map(([data, filter, sort]) => sortAndFilterData(data, filter, sort)));

  private loadedItems = false;

  constructor(private backend: FakeBackendService) { }

  loadItems(): void {
    if (!this.loadedItems) {
      this.backend.getAll().subscribe(items => this.data$.next(items));
      this.loadedItems = true;
    }
  }

  getItem(id: string): Observable<TodoItem> {
    return this.data$.pipe(
      map(items => items.find(item => item.id === id)),
      distinctUntilChanged(),
    );
  }

  addItem(item: Partial<TodoItem>): void {
    this.backend.addOne(item).subscribe(addedItem => {
      this.updateSubject(this.data$, addItemOperator(addedItem));
    });
  }

  removeItem(id: string): void {
    this.backend.removeOne(id).subscribe(removedId => {
      this.updateSubject(this.data$, removeItemOperator(removedId));
    });
  }

  toggleItemCompleted(id: string): void {
    const completedDateTime = convertDateToSeconds(new Date());
    this.backend.toggleCompleted(id, completedDateTime).subscribe(updatedItem => {
      this.updateSubject(this.data$, updateItemOperator(id, updatedItem));
    });
  }

  setSortField(field: string): void {
    this.updateSubject(this.sortSubj$, setSortFieldOperator(field));
  }

  setFilter(filter: ItemFilter): void {
    this.filterSubj$.next(filter);
  }

  private updateSubject<T>(source$: BehaviorSubject<T>, operator: (s: T) => T) {
    const currentValue: T = source$.getValue();
    const newValue: T = operator(currentValue);
    source$.next(newValue);
  }
}
