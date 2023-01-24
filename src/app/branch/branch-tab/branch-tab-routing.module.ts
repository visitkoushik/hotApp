import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BranchTabPage } from './branch-tab.page';

const routes: Routes = [
  {
    path: '',
    component: BranchTabPage,
    children: [
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../add-branch/add-branch-routing.module').then(
                (m) => m.AddBranchPageRoutingModule
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
              import('../branch-list/branch-list-routing.module').then(
                (m) => m.BranchListPageRoutingModule
              ),
          },
        ],
      },
      {
        path: '',
        redirectTo: '/branch-tab/list',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BranchTabPageRoutingModule {}
