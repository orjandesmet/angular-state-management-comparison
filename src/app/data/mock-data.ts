import { createTodoItem, TodoItem } from '../model/todo-item';

export const MOCK_TODO_ITEMS: TodoItem[] = [
  createTodoItem('1', 'Do work', new Date(2018, 9, 10)),
  createTodoItem('2', 'Eat cookies', new Date(2018, 8, 27), new Date()),
];
