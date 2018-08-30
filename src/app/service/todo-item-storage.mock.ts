import { of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { TodoItem } from '../model/todo-item';
import { TodoItemStorage } from './todo-item-storage';

export const itemStorageSpy: TodoItemStorage & { allItemsSpy: jasmine.Spy, filterSpy: jasmine.Spy, sortSpy: jasmine.Spy } = {
  allItems$: of<TodoItem[]>(MOCK_TODO_ITEMS).pipe(tap(items => itemStorageSpy.allItemsSpy(items))),
  sort$: of<ItemSort>({field: name, ascending: true}).pipe(tap(sort => itemStorageSpy.sortSpy(sort))),
  filter$: of<ItemFilter>(ItemFilter.ALL).pipe(tap(filter => itemStorageSpy.filterSpy(filter))),
  loadItems: jasmine.createSpy('loadItems'),
  allItemsSpy: jasmine.createSpy('allItems'),
  sortSpy: jasmine.createSpy('sort'),
  filterSpy: jasmine.createSpy('filter'),
  getItem: jasmine.createSpy('getItem'),
  addItem: jasmine.createSpy('addItem'),
  removeItem: jasmine.createSpy('removeItem'),
  setFilter: jasmine.createSpy('setFilter'),
  setSortField: jasmine.createSpy('setSortField'),
  toggleItemCompleted: jasmine.createSpy('toggleItemCompleted'),
};
