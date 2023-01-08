import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EmployeeAddPage } from './employee-add.page';

const routes: Routes = [
  {
    path: '',
    component: EmployeeAddPage,
    data: { title: 'Add Employee', hideLogin:true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeAddPageRoutingModule {}
