import { inject, TestBed } from '@angular/core/testing';
import { TODO_ITEM_STORAGE } from './todo-item-storage';
import { itemStorageSpy } from './todo-item-storage.mock';
import { TodoItemService } from './todo-item.service';


describe('TodoItemService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodoItemService,
        { provide: TODO_ITEM_STORAGE, useValue: itemStorageSpy },
      ],
    });
  });

  it('should be created', inject([TodoItemService], (service: TodoItemService) => {
    expect(service).toBeTruthy();
  }));
});
