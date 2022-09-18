import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ItemwisePage } from './itemwise.page';

const routes: Routes = [
  {
    path: '',
    component: ItemwisePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ItemwisePageRoutingModule {}
