import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchListPage } from './branch-list.page';

const routes: Routes = [
  {
    path: '',
    component: BranchListPage,
    data: { title: 'All Branch', hideLogin: true },
  },
  {
    path: 'update-branch',
    loadChildren: () =>
      import('../update-branch/update-branch-routing.module').then(
        (m) => m.UpdateBranchPageRoutingModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchListPageRoutingModule {}
