import { pairwise, skip } from 'rxjs/operators';
import { FakeBackendService } from '../data/fake-backend.service';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { ItemFilter } from '../model/item-filter.enum';
import { createTodoItem } from '../model/todo-item';
import { TodoItemStorageRxJs } from './todo-item-storage-rxjs';

describe('TodoItemStorageRxJs', () => {
  let storage: TodoItemStorageRxJs;
  beforeEach(() => {
    const fakeBackendService = new FakeBackendService();
    storage = new TodoItemStorageRxJs(fakeBackendService);
    storage.loadItems();
  });

  it('should get all items', () => {
    storage.allItems$.subscribe(items => {
      expect(items).toBeTruthy();
    }, err => fail(err));
  });

  it('should get filter', () => {
    storage.filter$.subscribe(filter => {
      expect(filter).not.toBeUndefined();
      expect(filter).not.toBeNull();
    }, err => fail(err));
  });

  it('should get sorting', () => {
    storage.sort$.subscribe(sorting => {
      expect(sorting).toBeTruthy();
    }, err => fail(err));
  });

  it('should get an item', () => {
    storage.getItem('1').subscribe(item => {
      expect(item).toBeTruthy();
      expect(item.id).toEqual('1');
    }, err => fail(err));
  });

  it('should get not update received item when a property changed', () => {
    storage.getItem('1').subscribe(item => {
      expect(item).toBeTruthy();
      expect(item.name).toEqual('Do work');
    }, err => fail(err));
    storage['data$'].next(MOCK_TODO_ITEMS.map(item => {
      if (item.id === '1') {
        item.name = 'Item 1 Changed';
      }
      return item;
    }));
  });

  it('should get update received item only when changed', () => {
    storage.getItem('1').pipe(skip(1)).subscribe(item => {
      expect(item).toBeTruthy();
      expect(item.name).toEqual('Item 1 Changed');
    }, err => fail(err));
    storage['data$'].next(MOCK_TODO_ITEMS.map(item => {
      if (item.id === '1') {
        return {
          ...item,
          name: 'Item 1 Changed'
        };
      }
      return item;
    }));
  });

  it('should add item', () => {
    storage.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.name === 'TEST_ITEM')).toBeFalsy();
      expect(post.find(item => item.name === 'TEST_ITEM')).toBeTruthy();
      expect(post.length).toBe(pre.length + 1);
    }, err => fail(err));
    storage.addItem(createTodoItem(undefined, 'TEST_ITEM'));
  });

  it('should remove an item', () => {
    storage.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.id === '1')).toBeTruthy();
      expect(post.find(item => item.id === '1')).toBeFalsy();
      expect(post.length).toBe(pre.length - 1);
    }, err => fail(err));
    storage.removeItem('1');
  });

  it('should toggle completed to true', () => {
    storage.allItems$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.find(item => item.id === '1').completedDateTime).toBeFalsy();
      expect(post.find(item => item.id === '1').completedDateTime).toBeTruthy();
      expect(post.length).toBe(pre.length);
    }, err => fail(err));
    storage.toggleItemCompleted('1');
  });

  it('should toggle sort field ascending', () => {
    storage.sort$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.field).toBe('name');
      expect(post.field).toBe('name');
      expect(pre.ascending).toBeTruthy();
      expect(post.ascending).toBeFalsy();
    }, err => fail(err));
    storage.setSortField('name');
  });

  it('should toggle sort field ascending', () => {
    storage.sort$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre.field).toBe('name');
      expect(post.field).toBe('date');
      expect(pre.ascending).toBeTruthy();
      expect(post.ascending).toBeTruthy();
    }, err => fail(err));
    storage.setSortField('date');
  });

  it('should toggle sort field ascending', () => {
    storage.filter$.pipe(pairwise()).subscribe(([pre, post]) => {
      expect(pre).not.toBe(post);
      expect(pre).toBe(ItemFilter.ALL);
      expect(post).toBe(ItemFilter.COMPLETE);
    }, err => fail(err));
    storage.setFilter(ItemFilter.COMPLETE);
  });
});
