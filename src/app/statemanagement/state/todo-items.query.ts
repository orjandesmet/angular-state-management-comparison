import { Injectable } from '@angular/core';
import { QueryEntity, SortBy } from '@datorama/akita';
import { combineLatest, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { filterTodoItemBy, sortTodoItemBy } from '../../model/todo-item.functions';
import { TodoItem } from './todo-item.model';
import { TodoItemsState, TodoItemsStore } from './todo-items.store';

@Injectable({
  providedIn: 'root'
})
export class TodoItemsQuery extends QueryEntity<TodoItemsState, TodoItem> {
  filter$ = this.select(store => store.filter);
  sort$ = this.select(store => store.sort);

  constructor(protected store: TodoItemsStore) {
    super(store);
  }

  selectItemById(id: string): Observable<TodoItem> {
    return this.selectEntity(id);
  }

  selectFilteredAndSortedItems() {
    return combineLatest(this.filter$, this.sort$)
      .pipe(
        switchMap(([filter, sort]) => {
          const filterBy: (entity: TodoItem) => boolean = filterTodoItemBy(filter);
          const sortBy: SortBy<TodoItem> = sortTodoItemBy(sort);
          return this.selectAll({ filterBy, sortBy });
        })
      );
  }

}
