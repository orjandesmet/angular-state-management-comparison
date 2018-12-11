import { MOCK_TODO_ITEMS } from '../data/mock-data';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { createTodoItem } from '../model/todo-item';
import { addItemOperator, removeItemOperator, updateItemOperator } from './item-operators';

describe('ItemOperators', () => {
  it('should add an item to the list', () => {
    expect(MOCK_TODO_ITEMS.find(item => item.name === 'TEST_NAME')).toBeFalsy();

    const newItem = createTodoItem(undefined, 'TEST_NAME');
    const items = addItemOperator(newItem)(MOCK_TODO_ITEMS);
    expect(items).not.toBe(MOCK_TODO_ITEMS);
    expect(items.length).toBe(MOCK_TODO_ITEMS.length + 1);
    expect(items.find(item => item.name === 'TEST_NAME')).toBeTruthy();
  });

  it('should remove an item from the list', () => {
    expect(MOCK_TODO_ITEMS.find(item => item.id === '2')).toBeTruthy();

    const items = removeItemOperator('2')(MOCK_TODO_ITEMS);
    expect(items).not.toBe(MOCK_TODO_ITEMS);
    expect(items.length).toBe(MOCK_TODO_ITEMS.length - 1);
    expect(items.find(item => item.id === '2')).toBeFalsy();
  });

  it('should update an item from the list', () => {
    expect(MOCK_TODO_ITEMS.find(item => item.id === '1').completedDateTime).toBeFalsy();

    const completedDateTime = convertDateToSeconds(new Date());
    const updatedItem = {
      ...MOCK_TODO_ITEMS.find(item => item.id === '1'),
      completedDateTime,
    };
    const items = updateItemOperator('1', updatedItem)(MOCK_TODO_ITEMS);
    expect(items).not.toBe(MOCK_TODO_ITEMS);
    expect(items.length).toBe(MOCK_TODO_ITEMS.length);
    expect(items.find(item => item.id === '1').completedDateTime).toBeTruthy();
  });
});
