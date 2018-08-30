export interface ItemSort {
  field: string;
  ascending: boolean;
}

export function updateItemSort(itemSort: ItemSort, field: string): ItemSort {
  return {
    ...itemSort,
    field,
    ascending: field === itemSort.field ? !itemSort.ascending : true,
  };
}
