import { inject, TestBed } from '@angular/core/testing';
import { pairwise } from 'rxjs/operators';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { ItemFilter } from '../model/item-filter.enum';
import { createTodoItem } from '../model/todo-item';
import { initialTodoItemsState, TodoItemsState, TodoItemsStore } from './state/todo-items.store';
import { TodoItemStorageAkitaService } from './todo-item-storage-akita.service';

const initialState: TodoItemsState = {
  ...initialTodoItemsState,
  ids: MOCK_TODO_ITEMS.map(item => item.id),
  entities: MOCK_TODO_ITEMS.reduce((p, c) => ({...p, [c.id]: c}), {}),
};

describe('TodoItemStorageAkitaService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoItemStorageAkitaService,
      ]
    });
    const store: TodoItemsStore = TestBed.get(TodoItemsStore);
    store.setState(() => initialState);
  });

  it('should be created', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all items', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.allItems$.subscribe(items => {
      expect(items).toBeTruthy();
    }, err => fail(err));
  }));

  it('should get filter', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.filter$.subscribe(filter => {
      expect(filter).not.toBeUndefined();
      expect(filter).not.toBeNull();
    }, err => fail(err));
  }));

  it('should get sorting', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.sort$.subscribe(sorting => {
      expect(sorting).toBeTruthy();
    }, err => fail(err));
  }));

  it('should get an item', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.getItem('1').subscribe(item => {
      expect(item).toBeTruthy();
      expect(item.id).toEqual('1');
    }, err => fail(err));
  }));

  it('should add item', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.name === 'TEST_ITEM')).toBeFalsy();
      expect(post.find(item => item.name === 'TEST_ITEM')).toBeTruthy();
      expect(post.length).toBe(pre.length + 1);
    }, err => fail(err));
    service.addItem(createTodoItem(undefined, 'TEST_ITEM'));
  }));

  it('should remove an item', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.id === '1')).toBeTruthy();
      expect(post.find(item => item.id === '1')).toBeFalsy();
      expect(post.length).toBe(pre.length - 1);
    }, err => fail(err));
    service.removeItem('1');
  }));

  it('should toggle completed to true', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.id === '1').completedDateTime).toBeFalsy();
      expect(post.find(item => item.id === '1').completedDateTime).toBeTruthy();
      expect(post.length).toBe(pre.length);
    }, err => fail(err));
    service.toggleItemCompleted('1');
  }));

  it('should toggle sort field ascending', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.sort$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.field).toBe('name');
      expect(post.field).toBe('name');
      expect(pre.ascending).toBeTruthy();
      expect(post.ascending).toBeFalsy();
    }, err => fail(err));
    service.setSortField('name');
  }));

  it('should toggle sort field ascending', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.sort$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.field).toBe('name');
      expect(post.field).toBe('date');
      expect(pre.ascending).toBeTruthy();
      expect(post.ascending).toBeTruthy();
    }, err => fail(err));
    service.setSortField('date');
  }));

  it('should toggle sort field ascending', inject([TodoItemStorageAkitaService], (service: TodoItemStorageAkitaService) => {
    service.filter$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre).toBe(ItemFilter.ALL);
      expect(post).toBe(ItemFilter.COMPLETE);
    }, err => fail(err));
    service.setFilter(ItemFilter.COMPLETE);
  }));
});
