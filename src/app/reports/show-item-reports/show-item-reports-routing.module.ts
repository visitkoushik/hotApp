import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowItemReportsPage } from './show-item-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ShowItemReportsPage,
    data: {
      title: 'Reports & Billings',
      displayBackButton: true,
      backTo: 'reports',
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShowItemReportsPageRoutingModule {}
