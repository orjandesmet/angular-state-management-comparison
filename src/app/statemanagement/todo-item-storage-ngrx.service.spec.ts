import { inject, TestBed } from '@angular/core/testing';
import { StoreModule } from '@ngrx/store';
import { pairwise } from 'rxjs/operators';
import { FakeBackendService } from '../data/fake-backend.service';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { ItemFilter } from '../model/item-filter.enum';
import { createTodoItem } from '../model/todo-item';
import { metaReducers, reducers } from './index';
import { TodoItemStorageNgrxService } from './todo-item-storage-ngrx.service';
import { initialState } from './todo-item.reducer';

const initiatedState = {
  todoItem: {
    ...initialState,
    ids: MOCK_TODO_ITEMS.map(item => item.id),
    entities: MOCK_TODO_ITEMS.reduce((p, c) => ({...p, [c.id]: c}), {}),
  }
};

describe('TodoItemStorageNgrxService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        StoreModule.forRoot(reducers, { metaReducers, initialState: initiatedState }),
      ],
      providers: [
        TodoItemStorageNgrxService,
        FakeBackendService,
      ]
    });
  });

  it('should be created', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all items', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.allItems$.subscribe(items => {
      expect(items).toBeTruthy();
    }, err => fail(err));
  }));

  it('should get filter', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.filter$.subscribe(filter => {
      expect(filter).not.toBeUndefined();
      expect(filter).not.toBeNull();
    }, err => fail(err));
  }));

  it('should get sorting', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.sort$.subscribe(sorting => {
      expect(sorting).toBeTruthy();
    }, err => fail(err));
  }));

  it('should get an item', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.getItem('1').subscribe(item => {
      expect(item).toBeTruthy();
      expect(item.id).toEqual('1');
    }, err => fail(err));
  }));

  it('should add item', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.name === 'TEST_ITEM')).toBeFalsy();
      expect(post.find(item => item.name === 'TEST_ITEM')).toBeTruthy();
      expect(post.length).toBe(pre.length + 1);
    }, err => fail(err));
    service.addItem(createTodoItem(undefined, 'TEST_ITEM'));
  }));

  it('should remove an item', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.id === '1')).toBeTruthy();
      expect(post.find(item => item.id === '1')).toBeFalsy();
      expect(post.length).toBe(pre.length - 1);
    }, err => fail(err));
    service.removeItem('1');
  }));

  it('should toggle completed to true', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.id === '1').completedDateTime).toBeFalsy();
      expect(post.find(item => item.id === '1').completedDateTime).toBeTruthy();
      expect(post.length).toBe(pre.length);
    }, err => fail(err));
    service.toggleItemCompleted('1');
  }));

  it('should toggle sort field ascending', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.sort$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.field).toBe('name');
      expect(post.field).toBe('name');
      expect(pre.ascending).toBeTruthy();
      expect(post.ascending).toBeFalsy();
    }, err => fail(err));
    service.setSortField('name');
  }));

  it('should toggle sort field ascending', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.sort$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.field).toBe('name');
      expect(post.field).toBe('date');
      expect(pre.ascending).toBeTruthy();
      expect(post.ascending).toBeTruthy();
    }, err => fail(err));
    service.setSortField('date');
  }));

  it('should toggle sort field ascending', inject([TodoItemStorageNgrxService], (service: TodoItemStorageNgrxService) => {
    service.filter$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre).toBe(ItemFilter.ALL);
      expect(post).toBe(ItemFilter.COMPLETE);
    }, err => fail(err));
    service.setFilter(ItemFilter.COMPLETE);
  }));
});
