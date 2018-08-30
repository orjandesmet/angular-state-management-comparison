import { isNullOrUndefined } from 'util';
import { convertSecondsToMS } from './date-time-seconds';
import { ItemFilter } from './item-filter.enum';
import { ItemSort } from './item-sort';
import { TodoItem } from './todo-item';

export function randomId(usedIds: string[] = []): string {
  let id = generateRandomId();
  while (usedIds.includes(id)) {
    id = generateRandomId();
  }
  return id;
}
function generateRandomId(): string  {
  return Math.random().toString(36).replace(/[^a-z]+/g, '').substr(2, 10);
}

export const filterTodoItemBy = (filter: ItemFilter) => (item: TodoItem): boolean => {
  switch (filter) {
    case ItemFilter.ALL:
      return true;
    case ItemFilter.COMPLETE:
      return !isNullOrUndefined(item.completedDateTime);
    case ItemFilter.INCOMPLETE:
      return isNullOrUndefined(item.completedDateTime);
    default:
      return true;
  }
};

export const sortTodoItemBy = (itemSort: ItemSort) => (a: TodoItem, b: TodoItem): number => {
  let sortNumber: number;
  switch (itemSort.field) {
    case 'name':
      sortNumber = a.name.toLowerCase().localeCompare(b.name.toLowerCase());
      break;
    case 'createdDateTime':
      sortNumber = convertSecondsToMS(a.createdDateTime) - convertSecondsToMS(b.createdDateTime);
      break;
    default:
      sortNumber = 1;
  }
  if (!itemSort.ascending) {
    return sortNumber * -1;
  }
  return sortNumber;
};

export function sortAndFilterData(data: TodoItem[], filter: ItemFilter, itemSort: ItemSort): TodoItem[] {
  return data
    .filter(filterTodoItemBy(filter))
    .sort(sortTodoItemBy(itemSort));
}
