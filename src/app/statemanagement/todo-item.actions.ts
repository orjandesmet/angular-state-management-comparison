import { Update } from '@ngrx/entity';
import { Action } from '@ngrx/store';
import { FilterActions } from './filter.actions';
import { SortActions } from './sort.actions';
import { TodoItem } from './todo-item.model';

export enum TodoItemActionTypes {
  LoadTodoItems = '[TodoItem] Load TodoItems',
  AddTodoItem = '[TodoItem] Add TodoItem',
  UpdateTodoItem = '[TodoItem] Update TodoItem',
  DeleteTodoItem = '[TodoItem] Delete TodoItem',
  FetchTodoItems = '[TodoItem] Fetch TodoItems',
}

export class LoadTodoItems implements Action {
  readonly type = TodoItemActionTypes.LoadTodoItems;

  constructor(public payload: { todoItems: TodoItem[] }) {}
}

export class AddTodoItem implements Action {
  readonly type = TodoItemActionTypes.AddTodoItem;

  constructor(public payload: { todoItem: TodoItem }) {}
}

export class UpdateTodoItem implements Action {
  readonly type = TodoItemActionTypes.UpdateTodoItem;

  constructor(public payload: { todoItem: Update<TodoItem> }) {}
}

export class DeleteTodoItem implements Action {
  readonly type = TodoItemActionTypes.DeleteTodoItem;

  constructor(public payload: { id: string }) {}
}

export class FetchTodoItems implements Action {
  readonly type = TodoItemActionTypes.FetchTodoItems;
}

export type TodoItemActions =
 LoadTodoItems
 | AddTodoItem
 | UpdateTodoItem
 | DeleteTodoItem
 | FetchTodoItems
 | SortActions
 | FilterActions;
