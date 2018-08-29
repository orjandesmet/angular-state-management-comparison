import { Action, createSelector, Selector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs/operators';
import { FakeBackendService } from '../../data/fake-backend.service';
import { ItemFilter } from '../../model/item-filter.enum';
import { ItemSort } from '../../model/item-sort';
import { TodoItem } from '../../model/todo-item';
import { sortAndFilterData } from '../../model/todo-item.functions';
import { SetFilter } from './filter.actions';
import { SetSort } from './sort.actions';
import * as fromActions from './todo-items.actions';

export class TodoItemsStateModel {
  public ids: string[];
  public entities: { [key: string]: TodoItem };
  public filter: ItemFilter;
  public sort: ItemSort;
  public loadedItems: boolean;
}

@State<TodoItemsStateModel>({
  name: 'todoItems',
  defaults: {
    ids: [],
    entities: {},
    filter: ItemFilter.ALL,
    sort: { field: 'name', ascending: true },
    loadedItems: false,
  }
})
export class TodoItemsState {

  constructor(private backend: FakeBackendService) { }

  @Selector()
  static selectFilter(state: TodoItemsStateModel) {
    return state.filter;
  }

  @Selector()
  static selectSort(state: TodoItemsStateModel) {
    return state.sort;
  }

  @Selector()
  static selectItemsArray(state: TodoItemsStateModel) {
    return state.ids.map(id => state.entities[id]);
  }

  @Selector([TodoItemsState.selectItemsArray, TodoItemsState.selectFilter, TodoItemsState.selectSort])
  static selectFilteredAndSortedItems(state: TodoItemsStateModel, items, filter, sort) {
    return sortAndFilterData(items, filter, sort);
  }

  static selectItemById(id: string) {
    return createSelector([TodoItemsState], (state: TodoItemsStateModel) => state.entities[id]);
  }

  @Action(fromActions.LoadTodoItems)
  load(ctx: StateContext<TodoItemsStateModel>, action: fromActions.LoadTodoItems) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ids: action.payload.map(item => item.id),
      entities: action.payload.reduce((p, c) => ({ ...p, [c.id]: c }), {}),
      loadedItems: true,
    });
  }

  @Action(fromActions.AddTodoItem)
  add(ctx: StateContext<TodoItemsStateModel>, action: fromActions.AddTodoItem) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ids: state.ids.concat(action.payload.id),
      entities: {
        ...state.entities,
        [action.payload.id]: action.payload,
      }
    });
  }

  @Action(fromActions.UpdateTodoItem)
  update(ctx: StateContext<TodoItemsStateModel>, action: fromActions.UpdateTodoItem) {
    const state = ctx.getState();
    delete action.payload.changes.id;
    ctx.setState({
      ...state,
      entities: {
        ...state.entities,
        [action.payload.id]: {
          ...state.entities[action.payload.id],
          ...action.payload.changes,
        },
      }
    });
  }

  @Action(fromActions.DeleteTodoItem)
  delete(ctx: StateContext<TodoItemsStateModel>, action: fromActions.DeleteTodoItem) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      ids: state.ids.filter(id => id !== action.payload),
      entities: state.ids.filter(id => id !== action.payload)
        .reduce((p, c) => ({
          ...p,
          [c]: state.entities[c],
        }), {}),
    });
  }

  @Action(fromActions.FetchTodoItems)
  fetch(ctx: StateContext<TodoItemsStateModel>) {
    if (!ctx.getState().loadedItems) {
      return this.backend.getAll().pipe(tap(entities => {
        ctx.dispatch(new fromActions.LoadTodoItems(entities));
      }));
    }
  }

  @Action(SetFilter)
  setFilter(ctx: StateContext<TodoItemsStateModel>, action: SetFilter) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      filter: action.payload,
    });
  }

  @Action(SetSort)
  setSortField(ctx: StateContext<TodoItemsStateModel>, action: SetSort) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      sort: {
        field: action.payload,
        ascending: state.sort.field === action.payload ? !state.sort.ascending : true,
      }
    });
  }
}
