import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportTabPage } from './report-tab.page';

const routes: Routes = [
  {
    path: '',
    component: ReportTabPage,
    children: [
      {
        path: 'showreportsbyItem',
        children: [
          {
            path: '',
            loadChildren:() => import('../show-item-reports/show-item-reports.module').then( m => m.ShowItemReportsPageModule)
          },
        ],
      },
      {
        path: 'showreports',
        children: [
          {
            path: '',
            loadChildren:() => import('../show-reports/show-reports.module').then( m => m.ShowReportsPageModule)
          },
        ],
      },

      {
        path: '',
        redirectTo: 'report-tab/showreports',
        pathMatch: 'full',
      },
    ]
  },
  {
    path: '',
    redirectTo: 'report-tab/showreports',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReportTabPageRoutingModule {}
