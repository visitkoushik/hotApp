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
            loadChildren:() => import('../add-item/add-item.module').then( m => m.AddItemPageModule)
          },
        ],
      },
      {
        path: 'item-list',
        children: [
          {
            path: '',
            loadChildren:() => import('../item-list/item-list.module').then( m => m.ItemListPageModule)
          },
        ],
      },
      {
        path: 'add-category',
        children: [
          {
            path: '',
            loadChildren:() => import('../add-category/add-category.module').then( m => m.AddCategoryPageModule)
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
