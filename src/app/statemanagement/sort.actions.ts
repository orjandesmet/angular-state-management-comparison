import { Action } from '@ngrx/store';

export enum SortActionTypes {
  SetSort = '[Sort] Set Sort'
}

export class SetSort implements Action {
  readonly type = SortActionTypes.SetSort;
  constructor(public readonly payload: {field: string}) { }
}

export type SortActions = SetSort;
