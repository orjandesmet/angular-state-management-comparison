import { inject, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { convertDateToSeconds } from '../model/date-time-seconds';
import { createTodoItem } from '../model/todo-item';
import { FakeBackendService } from './fake-backend.service';


describe('FakeBackendService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FakeBackendService]
    });
  });

  it('should be created', inject([FakeBackendService], (service: FakeBackendService) => {
    expect(service).toBeTruthy();
  }));

  it('should get all items', inject([FakeBackendService], (service: FakeBackendService) => {
    service.getAll().subscribe(items => {
      expect(items.length).toBe(2);
    });
  }));

  it('should add one item', inject([FakeBackendService], (service: FakeBackendService) => {
    service.addOne(createTodoItem('NEW_ID'))
      .pipe(
        tap(createdItem => {
          expect(createdItem.id).toEqual('NEW_ID');
        }),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(3);
        expect(items.find(item => item.id === 'NEW_ID')).toBeTruthy();
      });
  }));

  it('should update one item', inject([FakeBackendService], (service: FakeBackendService) => {
    service.updateOne('1', createTodoItem('NEW_ID', 'NEW_NAME'))
      .pipe(
        tap(updatedItem => {
          expect(updatedItem.id).toEqual('1');
          expect(updatedItem.name).toEqual('NEW_NAME');
        }),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(2);
        expect(items.find(item => item.id === 'NEW_ID')).toBeFalsy();
      });
  }));

  it('should throw error when trying to update one item with unknown id', inject([FakeBackendService], (service: FakeBackendService) => {
    service.updateOne('3', createTodoItem('NEW_ID', 'NEW_NAME'))
      .pipe(
        tap(() => {
         fail('should throw error');
        }, error => {
          expect(error).toEqual('404');
        }),
        catchError(() => of(null)),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(2);
        expect(items.find(item => item.id === 'NEW_ID')).toBeFalsy();
      });
  }));

  it('should toggle createdDateTime to truthy', inject([FakeBackendService], (service: FakeBackendService) => {
    service.toggleCompleted('1', convertDateToSeconds(new Date()))
      .pipe(
        tap(updatedItem => {
          expect(updatedItem.id).toEqual('1');
          expect(updatedItem.completedDateTime).toBeTruthy();
        }),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(2);
      });
  }));

  it('should toggle createdDateTime to falsy', inject([FakeBackendService], (service: FakeBackendService) => {
    service.toggleCompleted('2', convertDateToSeconds(new Date()))
      .pipe(
        tap(updatedItem => {
          expect(updatedItem.id).toEqual('2');
          expect(updatedItem.completedDateTime).toBeFalsy();
        }),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(2);
      });
  }));

  it('should throw error when trying to toggle createdDateTime for item with unknown id',
    inject([FakeBackendService], (service: FakeBackendService) => {
    service.toggleCompleted('3', convertDateToSeconds(new Date()))
      .pipe(
        tap(() => {
          fail('should throw error');
         }, error => {
           expect(error).toEqual('404');
         }),
         catchError(() => of(null)),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(2);
      });
  }));

  it('should remove one item', inject([FakeBackendService], (service: FakeBackendService) => {
    service.removeOne('2')
      .pipe(
        tap(removedItemId => {
          expect(removedItemId).toEqual('2');
        }),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(1);
        expect(items.find(item => item.id === '2')).toBeFalsy();
      });
  }));

  it('should throw error when trying to remove one item with unknown id', inject([FakeBackendService], (service: FakeBackendService) => {
    service.removeOne('3')
      .pipe(
        tap(() => {
          fail('should throw error');
         }, error => {
           expect(error).toEqual('404');
         }),
         catchError(() => of(null)),
        switchMap(() => service.getAll())
      )
      .subscribe(items => {
        expect(items.length).toBe(2);
      });
  }));
});

