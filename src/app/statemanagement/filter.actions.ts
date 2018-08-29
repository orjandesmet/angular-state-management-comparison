import { Action } from '@ngrx/store';
import { ItemFilter } from '../model/item-filter.enum';

export enum FilterActionTypes {
  SetFilter = '[Filter] Set Filter'
}

export class SetFilter implements Action {
  readonly type = FilterActionTypes.SetFilter;
  constructor(public payload: { filter: ItemFilter }) {}
}

export type FilterActions = SetFilter;
