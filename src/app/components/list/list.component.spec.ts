import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TODO_ITEM_STORAGE } from '../../service/todo-item-storage';
import { itemStorageSpy } from '../../service/todo-item-storage.mock';
import { TodoItemService } from '../../service/todo-item.service';
import { MaterialModule } from '../../shared/material/material.module';
import { ListComponent } from './list.component';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, ReactiveFormsModule],
      declarations: [ ListComponent ],
      providers: [
        TodoItemService,
        { provide: TODO_ITEM_STORAGE, useValue: itemStorageSpy }
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
