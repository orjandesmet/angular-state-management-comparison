import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { map, switchMap, take } from 'rxjs/operators';
import { FakeBackendService } from '../data/fake-backend.service';
import { LoadTodoItems, TodoItemActionTypes } from './todo-item.actions';


@Injectable()
export class TodoItemEffects {

  @Effect()
  fetchTodoItems$ = this.actions$.pipe(
    ofType(TodoItemActionTypes.FetchTodoItems),
    take(1),
    switchMap(() => this.backend.getAll()),
    map(todoItems => new LoadTodoItems({todoItems})),
  );

  constructor(
    private actions$: Actions,
    private backend: FakeBackendService,
  ) {}
}
