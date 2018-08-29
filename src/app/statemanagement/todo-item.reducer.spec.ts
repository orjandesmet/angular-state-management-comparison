import { ItemFilter } from '../model/item-filter.enum';
import { createTodoItem } from '../model/todo-item';
import { SetFilter } from './filter.actions';
import { SetSort } from './sort.actions';
import { AddTodoItem, DeleteTodoItem, LoadTodoItems, UpdateTodoItem } from './todo-item.actions';
import { initialState, reducer } from './todo-item.reducer';

describe('TodoItem Reducer', () => {

  describe('AddTodoItem', () => {
    it('should return a new state with an extra item', () => {
      const todoItem = createTodoItem('TEST_ID');
      const action = new AddTodoItem({todoItem});
      const result = reducer(initialState, action);
      expect(result).not.toBe(initialState);
      expect(result.ids).toContain('TEST_ID');
      expect(result.entities['TEST_ID']).toEqual(todoItem);
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
      expect(initiatedState.entities['TEST_ID'].name).toEqual('');
      const changes = createTodoItem('TEST_ID', 'NEW_NAME');
      const action = new UpdateTodoItem({todoItem: {id: 'TEST_ID', changes}});
      const result = reducer(initiatedState, action);
      expect(result).not.toBe(initiatedState);
      expect(result.ids).toContain('TEST_ID');
      expect(result.entities['TEST_ID']).toEqual(jasmine.objectContaining(changes));
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
      expect(initiatedState.entities['TEST_ID'].name).toEqual('');
      const action = new DeleteTodoItem({id: 'TEST_ID'});
      const result = reducer(initiatedState, action);
      expect(result).not.toBe(initiatedState);
      expect(result.ids).not.toContain('TEST_ID');
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
      const todoItems = [
        createTodoItem('TEST_ID_A'),
        createTodoItem('TEST_ID_B'),
        createTodoItem('TEST_ID_C'),
      ];
      const action = new LoadTodoItems({todoItems: todoItems});
      const result = reducer(initiatedState, action);
      expect(result).not.toBe(initiatedState);
      expect(result.ids).not.toContain('TEST_ID');
      expect(result.entities['TEST_ID_A']).toEqual(todoItems[0]);
      expect(result.entities['TEST_ID_B']).toEqual(todoItems[1]);
      expect(result.entities['TEST_ID_C']).toEqual(todoItems[2]);
    });
  });

  describe('SetFilter', () => {
    it('should return a new state with an updated filter', () => {
      expect(initialState.filter).not.toEqual(ItemFilter.COMPLETE);
      const action = new SetFilter({filter: ItemFilter.COMPLETE});
      const result = reducer(initialState, action);
      expect(result).not.toBe(initialState);
      expect(result.filter).toEqual(ItemFilter.COMPLETE);
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
      const action = new SetSort({field: 'name'});
      const result = reducer(initiatedState, action);
      expect(result).not.toBe(initiatedState);
      expect(result.sort.field).toEqual('name');
      expect(result.sort.ascending).toBeTruthy();
    });

    it('should return a new state with an updated sort ascending when ascending', () => {
      const initiatedState = {
        ...initialState,
        sort: {
          field: 'name',
          ascending: true,
        }
      };
      const action = new SetSort({field: 'name'});
      const result = reducer(initiatedState, action);
      expect(result).not.toBe(initiatedState);
      expect(result.sort.field).toEqual('name');
      expect(result.sort.ascending).toBeFalsy();
    });

    it('should return a new state with an updated sort field when descending', () => {
      const initiatedState = {
        ...initialState,
        sort: {
          field: 'name',
          ascending: false,
        }
      };
      const action = new SetSort({field: 'date'});
      const result = reducer(initiatedState, action);
      expect(result).not.toBe(initiatedState);
      expect(result.sort.field).toEqual('date');
      expect(result.sort.ascending).toBeTruthy();
    });

    it('should return a new state with an updated sort field when ascending', () => {
      const initiatedState = {
        ...initialState,
        sort: {
          field: 'name',
          ascending: true,
        }
      };
      const action = new SetSort({field: 'date'});
      const result = reducer(initiatedState, action);
      expect(result).not.toBe(initiatedState);
      expect(result.sort.field).toEqual('date');
      expect(result.sort.ascending).toBeTruthy();
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      const action = {} as any;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
