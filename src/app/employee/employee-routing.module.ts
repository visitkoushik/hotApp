import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeePage } from './employee.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeePage,
    data: { title: 'Add Employee', hideLogin:true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeePageRoutingModule {}
