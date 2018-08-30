import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Params } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Subject } from 'rxjs';
import { SecondsToDatePipe } from '../../pipe/seconds-to-date.pipe';
import { TODO_ITEM_STORAGE } from '../../service/todo-item-storage';
import { itemStorageSpy } from '../../service/todo-item-storage.mock';
import { TodoItemService } from '../../service/todo-item.service';
import { MaterialModule } from '../../shared/material/material.module';
import { ItemDetailComponent } from './item-detail.component';


const routeMock = {
  params: new Subject<Params>(),
};

describe('ItemDetailComponent', () => {
  let component: ItemDetailComponent;
  let fixture: ComponentFixture<ItemDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MaterialModule, RouterTestingModule],
      declarations: [ ItemDetailComponent, SecondsToDatePipe ],
      providers: [
        TodoItemService,
        { provide: TODO_ITEM_STORAGE, useValue: itemStorageSpy },
        { provide: ActivatedRoute, useValue: routeMock },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailComponent);
    component = fixture.componentInstance;
    routeMock.params.next({id: 'TEST_ID'});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
