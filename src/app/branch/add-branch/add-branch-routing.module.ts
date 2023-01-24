import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddBranchPage } from './add-branch.page';

const routes: Routes = [
  {
    path: '',
    component: AddBranchPage,
    data: { title: 'Add Branch', hideLogin:true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddBranchPageRoutingModule {}
