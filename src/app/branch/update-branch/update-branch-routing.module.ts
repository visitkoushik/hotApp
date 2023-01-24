import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdateBranchPage } from './update-branch.page';

const routes: Routes = [
  {
    path: '',
    component: UpdateBranchPage,
    data: { title: 'Update Branch', hideLogin:true },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdateBranchPageRoutingModule {}
