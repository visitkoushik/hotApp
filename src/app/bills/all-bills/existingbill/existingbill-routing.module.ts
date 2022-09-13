import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ExistingbillPage } from './existingbill.page';

const routes: Routes = [
  {
    path: '',
    component: ExistingbillPage,
    data: { title: 'Selected Bill',displayBackButton:true},

  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ExistingbillPageRoutingModule {}
