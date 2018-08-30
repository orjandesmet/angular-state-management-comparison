import { MOCK_TODO_ITEMS } from '../../data/mock-data';
import { ItemFilter } from '../../model/item-filter.enum';
import { initialTodoItemsState, TodoItemsState, TodoItemsStore } from './todo-items.store';

const initialState: TodoItemsState = {
  ...initialTodoItemsState,
  ids: MOCK_TODO_ITEMS.map(item => item.id),
  entities: MOCK_TODO_ITEMS.reduce((p, c) => ({ ...p, [c.id]: c }), {}),
};

describe('TodoItemsStore', () => {
  let store: TodoItemsStore;
  beforeEach(() => {
    store = new TodoItemsStore();
    store.setState(() => initialState);
  });

  describe('SetFilter', () => {
    it('should return a new state with an updated filter', () => {
      expect(initialState.filter).not.toEqual(ItemFilter.COMPLETE);
      store.setFilter(ItemFilter.COMPLETE);
      const result: TodoItemsState = store._value();
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
      store.setState(() => initiatedState);
      store.setSortField('name');
      const result: TodoItemsState = store._value();
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
      store.setState(() => initiatedState);
      store.setSortField('name');
      const result: TodoItemsState = store._value();
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
      store.setState(() => initiatedState);
      store.setSortField('date');
      const result: TodoItemsState = store._value();
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
      store.setState(() => initiatedState);
      store.setSortField('date');
      const result: TodoItemsState = store._value();
      expect(result).not.toBe(initiatedState);
      expect(result.sort.field).toEqual('date');
      expect(result.sort.ascending).toBeTruthy();
    });
  });
})
