import { async, inject, TestBed } from '@angular/core/testing';
import { NgxsModule, Store } from '@ngxs/store';
import { ItemFilter } from '../../model/item-filter.enum';
import { createTodoItem } from '../../model/todo-item';
import { SetFilter } from './filter.actions';
import { SetSort } from './sort.actions';
import { AddTodoItem, DeleteTodoItem, FetchTodoItems, LoadTodoItems, UpdateTodoItem } from './todo-items.actions';
import { TodoItemsState, TodoItemsStateModel } from './todo-items.state';

const initialState = {
  ids: [],
  entities: {},
  filter: ItemFilter.ALL,
  sort: { field: 'name', ascending: true },
  loadedItems: false,
}

describe('TodoItems actions', () => {
  let store: Store;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NgxsModule.forRoot([TodoItemsState])]
    }).compileComponents();
    store = TestBed.get(Store);
    store.reset({ todoItems: initialState });
  }));

  describe('FetchTodoItems', () => {
    const action = new FetchTodoItems();
    it('should fill state with data from FakeBackend when FetchTodoItems has ben emitted', () => {
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result.ids.length).toBe(2);
      });
    });

    it('shouldfill state with data from FakeBackend only once when FetchTodoItems has ben emitted multiple times',
      inject([TodoItemsState], (itemState: TodoItemsState) => {
        const backendSpy = spyOn(itemState['backend'], 'getAll').and.callThrough();
        store.dispatch(action);
        store.dispatch(action);
        store.dispatch(action);
        expect(backendSpy).toHaveBeenCalledTimes(1);
    }));
  });

  describe('AddTodoItem', () => {
    it('should return a new state with an extra item', () => {
      const todoItem = createTodoItem('TEST_ID');
      const action = new AddTodoItem(todoItem);
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initialState);
        expect(result.ids).toContain('TEST_ID');
        expect(result.entities['TEST_ID']).toEqual(todoItem);
      });
    });
  });

  describe('UpdateTodoItem', () => {
    it('should return a new state with an updated item', () => {
      const initiatedState = {
        ...initialState,
        ids: ['TEST_ID'],
        entities: {
          'TEST_ID': createTodoItem('TEST_ID'),
        }
      };
      store.reset({ todoItems: initiatedState });
      expect(initiatedState.entities['TEST_ID'].name).toEqual('');
      const changes = createTodoItem('TEST_ID', 'NEW_NAME');
      const action = new UpdateTodoItem({ id: 'TEST_ID', changes });
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initiatedState);
        expect(result.ids).toContain('TEST_ID');
        expect(result.entities['TEST_ID']).toEqual(jasmine.objectContaining(changes));
      });
    });
  });

  describe('DeleteTodoItem', () => {
    it('should return a new state with an item removed', () => {
      const initiatedState = {
        ...initialState,
        ids: ['TEST_ID'],
        entities: {
          'TEST_ID': createTodoItem('TEST_ID'),
        }
      };
      store.reset({ todoItems: initiatedState });
      expect(initiatedState.entities['TEST_ID'].name).toEqual('');
      const action = new DeleteTodoItem('TEST_ID');
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initiatedState);
        expect(result.ids).not.toContain('TEST_ID');
      });
    });
  });

  describe('AddTodoItem', () => {
    it('should return a new state with items', () => {
      const initiatedState = {
        ...initialState,
        ids: ['TEST_ID'],
        entities: {
          'TEST_ID': createTodoItem('TEST_ID'),
        }
      };
      store.reset({ todoItems: initiatedState });
      const todoItems = [
        createTodoItem('TEST_ID_A'),
        createTodoItem('TEST_ID_B'),
        createTodoItem('TEST_ID_C'),
      ];
      const action = new LoadTodoItems(todoItems);
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initiatedState);
        expect(result.ids).not.toContain('TEST_ID');
        expect(result.entities['TEST_ID_A']).toEqual(todoItems[0]);
        expect(result.entities['TEST_ID_B']).toEqual(todoItems[1]);
        expect(result.entities['TEST_ID_C']).toEqual(todoItems[2]);
      });
    });
  });

  describe('SetFilter', () => {
    it('should return a new state with an updated filter', () => {
      expect(initialState.filter).not.toEqual(ItemFilter.COMPLETE);
      const action = new SetFilter(ItemFilter.COMPLETE);
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initialState);
        expect(result.filter).toEqual(ItemFilter.COMPLETE);
      });
    });
  });

  describe('SetSort', () => {
    it('should return a new state with an updated sort ascending when descending', () => {
      const initiatedState = {
        ...initialState,
        sort: {
          field: 'name',
          ascending: false,
        }
      };
      store.reset({ todoItems: initiatedState });
      const action = new SetSort('name');
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initiatedState);
        expect(result.sort.field).toEqual('name');
        expect(result.sort.ascending).toBeTruthy();
      });
    });

    it('should return a new state with an updated sort ascending when ascending', () => {
      const initiatedState = {
        ...initialState,
        sort: {
          field: 'name',
          ascending: true,
        }
      };
      store.reset({ todoItems: initiatedState });
      const action = new SetSort('name');
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initiatedState);
        expect(result.sort.field).toEqual('name');
        expect(result.sort.ascending).toBeFalsy();
      });
    });

    it('should return a new state with an updated sort field when descending', () => {
      const initiatedState = {
        ...initialState,
        sort: {
          field: 'name',
          ascending: false,
        }
      };
      store.reset({ todoItems: initiatedState });
      const action = new SetSort('date');
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initiatedState);
        expect(result.sort.field).toEqual('date');
        expect(result.sort.ascending).toBeTruthy();
      });
    });

    it('should return a new state with an updated sort field when ascending', () => {
      const initiatedState = {
        ...initialState,
        sort: {
          field: 'name',
          ascending: true,
        }
      };
      store.reset({ todoItems: initiatedState });
      const action = new SetSort('date');
      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).not.toBe(initiatedState);
        expect(result.sort.field).toEqual('date');
        expect(result.sort.ascending).toBeTruthy();
      });
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      store.dispatch(action);
      store.select(state => state.todoItems).subscribe((result: TodoItemsStateModel) => {
        expect(result).toBe(initialState);
      });

    });
  });

});
