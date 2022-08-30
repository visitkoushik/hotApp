import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConfiremdBillPage } from './confirmed-bill';


const routes: Routes = [
  {
    path: '',
    component: ConfiremdBillPage,
    data: { title: 'Generated Bill',displayBackButton:true},
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfiremedbillPageRoutingModule {}
