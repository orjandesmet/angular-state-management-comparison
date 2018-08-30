import { convertDateToSeconds } from './date-time-seconds';

export interface TodoItem {
  id: string;
  name: string;
  createdDateTime: { seconds: number, nanoSeconds: number };
  completedDateTime?: { seconds: number, nanoSeconds: number };
}

export function createTodoItem(
  id: string = null, name: string = '', createdDateTime: Date = new Date(), completedDateTime: Date = null
): TodoItem {
  return {
    id,
    name,
    createdDateTime: convertDateToSeconds(createdDateTime),
    completedDateTime: convertDateToSeconds(completedDateTime),
  };
}
