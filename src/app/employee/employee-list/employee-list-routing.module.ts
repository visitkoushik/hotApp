import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListPage } from './employee-list.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListPage,
    data: { title: 'Employee List', hideLogin: true },
  },
  {
    path: 'update-employee',
    loadChildren: () =>
      import('../update-employee/update-employee-routing.module').then(
        (m) => m.UpdateEmployeePageRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeListPageRoutingModule {}
