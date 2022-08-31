import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabPage } from './tab.page';


const routes: Routes = [
  {
    path: '',
    component: TabPage,
    children: [
      {
        path: 'createbill',
        children: [
          {
            path: '',
            loadChildren:() => import('../create-bill/create-bill.module').then( m => m.CreateBillPageModule)
          },
        ],
      },
      {
        path: 'allbills',
        children: [
          {
            path: '',
            loadChildren:() => import('../all-bills/all-bills.module').then( m => m.AllBillsPageModule)
          },
        ],
      },

      {
        path: '',
        redirectTo: '/tab/createbill',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabPageRoutingModule {}
