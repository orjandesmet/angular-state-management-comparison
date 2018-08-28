import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { TodoItem } from '../model/todo-item';

type T = TodoItem[];

export const addItemOperator = (item: TodoItem): OperatorFunction<T, T> =>
  (source$: Observable<T>) => {
    return source$.pipe(
      map(items => {
        return items.concat(item);
      })
    );
  };

export const removeItemOperator = (id: string): OperatorFunction<T, T> =>
  (source$: Observable<T>) => {
    return source$.pipe(
      map(items => items.filter(item => item.id !== id))
    );
  };

export const updateItemOperator = (id: string, updatedItem: TodoItem): OperatorFunction<T, T> =>
  (source$: Observable<T>) => {
    delete updatedItem.id;
    return source$.pipe(
      map(items => items.map(item => item.id !== id ? item : {
        ...item,
        ...updatedItem,
      }))
    );
  };

