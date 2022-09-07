import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabItemPage } from './tab-item.page';

const routes: Routes = [
  {
    path: '',
    component: TabItemPage,
    children: [
      {
        path: 'add-item',
        children: [
          {
            path: '',
            loadChildren:() => import('../add-item/add-item-routing.module').then( m => m.AddItemPageRoutingModule)
          },
        ],
      },
      {
        path: 'item-list',
        children: [
          {
            path: '',
            loadChildren:() => import('../item-list/item-list-routing.module').then( m => m.ItemListPageRoutingModule)
          },
        ],
      },

      {
        path: '',
        redirectTo: '/tab-item/add-item',
        pathMatch: 'full',
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabItemPageRoutingModule {}
