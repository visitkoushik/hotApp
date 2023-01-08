import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeListPage } from './employee-list.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeListPage,
    data: { title: 'Employee List', hideLogin:true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeListPageRoutingModule {}
