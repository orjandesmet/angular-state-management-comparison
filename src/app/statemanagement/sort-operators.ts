import { ItemSort, updateItemSort } from '../model/item-sort';

type T = ItemSort;

export const setSortFieldOperator = (field: string) => (sort: T): T => {
  return updateItemSort(sort, field);
}

