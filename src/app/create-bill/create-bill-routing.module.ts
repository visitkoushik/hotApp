import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateBillPage } from './create-bill.page';

const routes: Routes = [
  {
    path: '',
    component: CreateBillPage,
    data: {title: 'New Bill'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateBillPageRoutingModule {}
