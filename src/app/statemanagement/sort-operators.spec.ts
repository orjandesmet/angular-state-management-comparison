import { of } from 'rxjs';
import { ItemSort } from '../model/item-sort';
import { setSortFieldOperator } from './sort-operators';

describe('SortOperators', () => {
  it('should set sort field when different than current field', () => {
    const initialSort: ItemSort = { field: 'name', ascending: true };

    const sort$ = of(initialSort);
    setSortFieldOperator('date')(sort$).subscribe(sort => {
      expect(sort).not.toBe(initialSort);
      expect(sort.field).toBe('date');
      expect(sort.ascending).toBeTruthy();
    }, err => fail(err));
  });

  it('should set sort ascending to true when different than current field', () => {
    const initialSort: ItemSort = { field: 'name', ascending: false };

    const sort$ = of(initialSort);
    setSortFieldOperator('date')(sort$).subscribe(sort => {
      expect(sort).not.toBe(initialSort);
      expect(sort.field).toBe('date');
      expect(sort.ascending).toBeTruthy();
    }, err => fail(err));
  });

  it('should set toggle ascending when same as current field', () => {
    const initialSort: ItemSort = { field: 'name', ascending: false };

    const sort$ = of(initialSort);
    setSortFieldOperator('name')(sort$).subscribe(sort => {
      expect(sort).not.toBe(initialSort);
      expect(sort.field).toBe('name');
      expect(sort.ascending).toBeTruthy();
    }, err => fail(err));
  });

  it('should set toggle ascending when same as current field', () => {
    const initialSort: ItemSort = { field: 'name', ascending: true };

    const sort$ = of(initialSort);
    setSortFieldOperator('name')(sort$).subscribe(sort => {
      expect(sort).not.toBe(initialSort);
      expect(sort.field).toBe('name');
      expect(sort.ascending).toBeFalsy();
    }, err => fail(err));
  });
});
