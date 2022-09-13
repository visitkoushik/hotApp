import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiremdBillPage } from '../confirmed-bill/confirmed-bill';

import { NewbillPage } from './newbill.page';

const routes: Routes = [
  {
    path: '',
    component: NewbillPage,
    data: { title: 'In Cart',displayBackButton:true },
  },
  {
    path: 'confirmedbill',
    loadChildren: () => import('../confirmed-bill/confirmed-bill.module').then( m => m.ConfiremedbillPageModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewbillPageRoutingModule {}
