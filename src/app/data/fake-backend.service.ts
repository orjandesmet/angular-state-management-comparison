import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { DateTimeSeconds } from '../model/date-time-seconds';
import { createTodoItem, TodoItem } from '../model/todo-item';
import { randomId } from '../model/todo-item.functions';
import { MOCK_TODO_ITEMS } from './mock-data';

// This service mocks a REST Backend

@Injectable({
  providedIn: 'root'
})
export class FakeBackendService {

  private items = MOCK_TODO_ITEMS.reduce((p, c) => ({ ...p, [c.id]: c }), {});
  private ids = Object.keys(this.items);

  getAll(): Observable<TodoItem[]> {
    console.log('FakeBackendService: GET All');
    return of(Object.values(this.items));
  }

  addOne(item: Partial<TodoItem>): Observable<TodoItem> {
    console.log('FakeBackendService: POST One');
    const newItem: TodoItem = {
      ...createTodoItem(),
      ...item,
      id: item.id || randomId(this.ids),
    };
    this.items[newItem.id] = newItem;
    this.ids.push(newItem.id);
    return of(newItem);
  }

  updateOne(id: string, item: Partial<TodoItem>): Observable<TodoItem> {
    console.log('FakeBackendService: PUT One');
    const index = this.ids.indexOf(id);
    if (index === -1) {
      console.error(`FakeBackendService: PUT Id ${id} not found`);
      return throwError('404');
    } else {
      delete item.id;
      this.items[id] = {
        ...this.items[id],
        ...item
      };
      return of(this.items[id]);
    }
  }

  toggleCompleted(id: string, completedDateTime: DateTimeSeconds) {
    console.log('FakeBackendService: PATCH One');
    const index = this.ids.indexOf(id);
    if (index === -1) {
      console.error(`FakeBackendService: PATCH Id ${id} not found`);
      return throwError('404');
    } else {
      this.items[id] = {
        ...this.items[id],
        completedDateTime: this.items[id].completedDateTime ? null : completedDateTime
      };
      return of(this.items[id]);
    }
  }

  removeOne(id: string): Observable<string> {
    console.log('FakeBackendService: DELETE One');
    const index = this.ids.indexOf(id);
    if (index === -1) {
      console.error(`FakeBackendService: DELETE Id ${id} not found`);
      return throwError('404');
    } else {
      delete this.items[id];
      this.ids.splice(index, 1);
      return of(id);
    }
  }


}
