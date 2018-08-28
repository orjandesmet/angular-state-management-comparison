import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { SecondsToDatePipe } from './pipe/seconds-to-date.pipe';
import { TODO_ITEM_STORAGE } from './service/todo-item-storage';
import { MaterialModule } from './shared/material/material.module';
import { TodoItemStorageRxJs } from './statemanagement/todo-item-storage-rxjs';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    ListItemComponent,
    ItemDetailComponent,
    SecondsToDatePipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  providers: [
    { provide: TODO_ITEM_STORAGE, useClass: TodoItemStorageRxJs }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
