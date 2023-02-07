import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OtherExpensesPage } from './other-expenses.page';

const routes: Routes = [
  {
    path: '',
    component: OtherExpensesPage,
    children: [
      {
        path: 'add',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./add/add.module').then((m) => m.AddPageModule),
          },
        ],
      },
      {
        path: 'list',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./list/list.module').then((m) => m.ListPageModule),
          },
        ],
      },
      {
        path: 'update',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./update/update.module').then((m) => m.UpdatePageModule),
          },
        ],
      },

      {
        path: '',
        redirectTo: '/other-expenses/add',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OtherExpensesPageRoutingModule {}
