import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, pluck, switchMap } from 'rxjs/operators';
import { TodoItemService } from '../../service/todo-item.service';

@Component({
  selector: 'todo-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent {

  item$ = this.route.params.pipe(
    pluck<Params, string>('id'),
    filter(id => !!id),
    switchMap(id => this.service.getItem(id)),
  );

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: TodoItemService,
  ) { }

  onCheckboxClicked(id: string) {
    this.service.toggleItemCompleted(id);
  }

  removeItem(id: string) {
    this.service.removeItem(id);
    this.router.navigateByUrl('/');
  }
}
