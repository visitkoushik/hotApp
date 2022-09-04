import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShowReportsPage } from './show-reports.page';

const routes: Routes = [
  {
    path: '',
    component: ShowReportsPage,
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
export class ShowReportsPageRoutingModule {}
