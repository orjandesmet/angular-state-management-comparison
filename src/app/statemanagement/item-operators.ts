import { TodoItem } from '../model/todo-item';

type T = TodoItem[];

export const addItemOperator = (item: TodoItem) => (items: T): T => {
  return items.concat(item);
}

export const removeItemOperator = (id: string) => (items: T): T => {
  return items.filter(item => item.id !== id);
};

export const updateItemOperator = (id: string, updatedItem: TodoItem) => (items: T): T => {
  delete updatedItem.id;
  return items.map(item => item.id !== id ? item : {
    ...item,
    ...updatedItem,
  });
};

