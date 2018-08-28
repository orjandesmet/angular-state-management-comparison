import { of } from 'rxjs';
import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { createTodoItem, TodoItem } from '../model/todo-item';
import { addItemOperator, removeItemOperator, updateItemOperator } from './item-operators';

describe('ItemOperators', () => {
  it('should add an item to the list', () => {
    expect(MOCK_TODO_ITEMS.find(item => item.name === 'TEST_NAME')).toBeFalsy();

    const items$ = of<TodoItem[]>(MOCK_TODO_ITEMS);
    const newItem = createTodoItem(undefined, 'TEST_NAME');
    addItemOperator(newItem)(items$).subscribe(items => {
      expect(items).not.toBe(MOCK_TODO_ITEMS);
      expect(items.length).toBe(MOCK_TODO_ITEMS.length + 1);
      expect(items.find(item => item.name === 'TEST_NAME')).toBeTruthy();
    }, err => fail(err));
  });

  it('should remove an item from the list', () => {
    expect(MOCK_TODO_ITEMS.find(item => item.id === '2')).toBeTruthy();

    const items$ = of<TodoItem[]>(MOCK_TODO_ITEMS);
    removeItemOperator('2')(items$).subscribe(items => {
      expect(items).not.toBe(MOCK_TODO_ITEMS);
      expect(items.length).toBe(MOCK_TODO_ITEMS.length - 1);
      expect(items.find(item => item.id === '2')).toBeFalsy();
    }, err => fail(err));
  });

  it('should update an item from the list', () => {
    expect(MOCK_TODO_ITEMS.find(item => item.id === '1').completedDateTime).toBeFalsy();

    const items$ = of<TodoItem[]>(MOCK_TODO_ITEMS);
    const completedDateTime = convertDateToSeconds(new Date());
    const updatedItem = {
      ...MOCK_TODO_ITEMS.find(item => item.id === '1'),
      completedDateTime,
    };
    updateItemOperator('1', updatedItem)(items$).subscribe(items => {
      expect(items).not.toBe(MOCK_TODO_ITEMS);
      expect(items.length).toBe(MOCK_TODO_ITEMS.length);
      expect(items.find(item => item.id === '1').completedDateTime).toBeTruthy();
    }, err => fail(err));
  });
});
