import { Observable, OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemSort, updateItemSort } from '../model/item-sort';

type T = ItemSort;

export const setSortFieldOperator = (field: string): OperatorFunction<T, T> =>
  (source$: Observable<T>) => {
    return source$.pipe(map(sort => updateItemSort(sort, field)));
  };

