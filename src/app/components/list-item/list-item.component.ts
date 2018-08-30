import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { TodoItem } from '../../model/todo-item';

@Component({
  selector: 'todo-list-item',
  templateUrl: './list-item.component.html',
  styleUrls: ['./list-item.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListItemComponent {

  @Input() item: TodoItem;
  @Output() toggleItemCompleted = new EventEmitter<string>();
  @Output() delete = new EventEmitter<string>();

  onCheckboxClicked(): void {
    this.toggleItemCompleted.emit(this.item.id);
  }

  onDeleteClicked(): void {
    this.delete.emit(this.item.id);
  }

}
