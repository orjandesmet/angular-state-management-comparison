import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { createFeatureSelector } from '@ngrx/store';
import { ItemFilter } from '../model/item-filter.enum';
import { ItemSort } from '../model/item-sort';
import { FilterActionTypes } from './filter.actions';
import { SortActionTypes } from './sort.actions';
import { TodoItemActions, TodoItemActionTypes } from './todo-item.actions';
import { TodoItem } from './todo-item.model';

export interface State extends EntityState<TodoItem> {
  // additional entities state properties
  filter: ItemFilter;
  sort: ItemSort;
}

export const adapter: EntityAdapter<TodoItem> = createEntityAdapter<TodoItem>();

export const initialState: State = adapter.getInitialState({
  // additional entity state properties
  filter: ItemFilter.ALL,
  sort: {field: 'name', ascending: true },
});

export function reducer(
  state = initialState,
  action: TodoItemActions
): State {
  switch (action.type) {
    case TodoItemActionTypes.AddTodoItem: {
      return adapter.addOne(action.payload.todoItem, state);
    }

    case TodoItemActionTypes.UpdateTodoItem: {
      return adapter.updateOne(action.payload.todoItem, state);
    }

    case TodoItemActionTypes.DeleteTodoItem: {
      return adapter.removeOne(action.payload.id, state);
    }

    case TodoItemActionTypes.LoadTodoItems: {
      return adapter.addAll(action.payload.todoItems, state);
    }

    case FilterActionTypes.SetFilter: {
      return {
        ...state,
        filter: action.payload.filter,
      };
    }

    case SortActionTypes.SetSort: {
      return {
        ...state,
        sort: {
          ...state.sort,
          field: action.payload.field,
          ascending: state.sort.field === action.payload.field ? !state.sort.ascending : true,
        }
      };
    }

    default: {
      return state;
    }
  }
}

export const selectTodoItemState = createFeatureSelector<State>('todoItem');

export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal,
} = adapter.getSelectors(selectTodoItemState);
