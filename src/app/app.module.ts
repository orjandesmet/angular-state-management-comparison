import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ListItemComponent } from './components/list-item/list-item.component';
import { ListComponent } from './components/list/list.component';
import { SecondsToDatePipe } from './pipe/seconds-to-date.pipe';
import { TODO_ITEM_STORAGE } from './service/todo-item-storage';
import { MaterialModule } from './shared/material/material.module';
import { metaReducers, reducers } from './statemanagement';
import { TodoItemStorageNgrxService } from './statemanagement/todo-item-storage-ngrx.service';
import { TodoItemEffects } from './statemanagement/todo-item.effects';

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
    StoreModule.forRoot(reducers, { metaReducers }),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    EffectsModule.forRoot([TodoItemEffects]),
  ],
  providers: [
    {provide: TODO_ITEM_STORAGE, useClass: TodoItemStorageNgrxService }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
