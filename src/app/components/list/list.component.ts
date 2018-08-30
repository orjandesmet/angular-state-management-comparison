import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatButtonToggleChange } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ItemSort } from '../../model/item-sort';
import { TodoItem } from '../../model/todo-item';
import { TodoItemService } from '../../service/todo-item.service';

@Component({
  selector: 'todo-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  addFormGroup: FormGroup = this.createFormGroup();
  todoItems$: Observable<TodoItem[]> = this.service.todoItems$;
  hasTodoItems$: Observable<boolean> = this.todoItems$.pipe(map(items => items.length > 0));
  sort$: Observable<ItemSort> = this.service.sort$;
  filter$: Observable<string> = this.service.filter$;
  sortableFields = [{key: 'name', label: 'Name'}, {key: 'createdDateTime', label: 'Created Date & Time'}];

  constructor(
    private fb: FormBuilder,
    private service: TodoItemService
  ) { }

  ngOnInit() {
    this.service.loadItems();
  }

  toggleItemCompleted(id: string): void {
    this.service.toggleItemCompleted(id);
  }

  submit() {
    if (this.addFormGroup.valid) {
      this.service.addItem(this.addFormGroup.value);
      this.addFormGroup.get('name').setValue('');
      this.addFormGroup.get('name').markAsPristine();
      this.addFormGroup.get('name').markAsUntouched();
      this.addFormGroup.get('name').updateValueAndValidity();
    }
  }

  deleteTodoItem(id: string): void {
    this.service.removeItem(id);
  }

  onFilterChange(event: MatButtonToggleChange) {
    this.service.setFilterString(event.value);
  }

  onSortChange(value: string) {
    this.service.setSortField(value);
  }

  private createFormGroup(): FormGroup {
    return this.fb.group({
      name: this.fb.control('', Validators.required)
    });
  }
}
