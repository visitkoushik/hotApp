import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportsPage } from './reports.page';

const routes: Routes = [
  {
    path: '',
    component: ReportsPage,
    data:{title:'Reports & Billings'}
  },
  {
    path: 'show-reports',
    loadChildren: () => import('./show-reports/show-reports.module').then( m => m.ShowReportsPageModule)
  },
  {
    path: 'report-tab',
    loadChildren: () => import('./report-tab/report-tab.module').then( m => m.ReportTabPageModule)
  },
  {
    path: 'show-item-reports',
    loadChildren: () => import('./show-item-reports/show-item-reports.module').then( m => m.ShowItemReportsPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportsPageRoutingModule {}
