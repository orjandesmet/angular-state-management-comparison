import { ItemFilter } from '../../model/item-filter.enum';

export class SetFilter {
  static readonly type = '[Filter] Set Filter';
  constructor(public payload: ItemFilter) { }
}
