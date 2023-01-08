import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeTabPage } from './employee-tab.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeTabPage,
    children: [
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../addEmployee/employee-add-routing.module').then(
                (m) => m.EmployeeAddPageRoutingModule
              ),
          },
        ],
      },
      {
        path: 'list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../employee-list/employee-list-routing.module').then(
                (m) => m.EmployeeListPageRoutingModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/employee-tab/list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeTabPageRoutingModule {}
