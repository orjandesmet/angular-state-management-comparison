import { TodoItem } from '../../model/todo-item';

export class LoadTodoItems {
  static readonly type = '[TodoItems] Load TodoItems';
  constructor(public payload: TodoItem[]) { }
}

export class AddTodoItem {
  static readonly type = '[TodoItems] Add TodoItem';
  constructor(public payload: TodoItem) { }
}

export class UpdateTodoItem  {
  static readonly type = '[TodoItems] Update TodoItem';
  constructor(public payload: { id: string, changes: TodoItem }) { }
}

export class DeleteTodoItem {
  static readonly type = '[TodoItems] Delete TodoItem';
  constructor(public payload: string) { }
}

export class FetchTodoItems {
  static readonly type = '[TodoItems] Fetch TodoItems';
}
