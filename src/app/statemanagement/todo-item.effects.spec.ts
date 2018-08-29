import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Subject } from 'rxjs';
import { count } from 'rxjs/operators';
import { FetchTodoItems, TodoItemActionTypes } from './todo-item.actions';
import { TodoItemEffects } from './todo-item.effects';


describe('TodoItemEffects', () => {
  const actions$ = new Subject<any>();
  let effects: TodoItemEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoItemEffects,
        provideMockActions(() => actions$)
      ]
    });

    effects = TestBed.get(TodoItemEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should return a LoadTodoItems when FetchTodoItems has ben emitted', () => {
    effects.fetchTodoItems$.subscribe(action => {
      expect(action.type).toEqual(TodoItemActionTypes.LoadTodoItems);
    });
    actions$.next(new FetchTodoItems());
  });

  it('should return a LoadTodoItems only once when FetchTodoItems has ben emitted multiple times', () => {
    effects.fetchTodoItems$
    .pipe(count())
    .subscribe(counted => {
      expect(counted).toBe(1);
    });
    actions$.next(new FetchTodoItems());
    actions$.next(new FetchTodoItems());
    actions$.next(new FetchTodoItems());
  });
});
