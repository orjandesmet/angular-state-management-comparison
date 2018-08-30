import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemDetailComponent } from './components/item-detail/item-detail.component';
import { ListComponent } from './components/list/list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: ListComponent,
  },
  {
    path: ':id',
    component: ItemDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
