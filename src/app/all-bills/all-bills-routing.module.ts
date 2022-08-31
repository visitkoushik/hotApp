import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AllBillsPage } from './all-bills.page';

const routes: Routes = [
  {
    path: '',
    component: AllBillsPage,
    data: { title: 'All Bills' },
  },
  {
    path: 'existingbill',
    loadChildren: () => import('./existingbill/existingbill.module').then( m => m.ExistingbillPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AllBillsPageRoutingModule {}
