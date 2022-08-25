import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ConfigurePage } from './configure.page';

const routes: Routes = [
  {
    path: '',
    component: ConfigurePage,
    data: {title: 'Configure'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ConfigurePageRoutingModule {}
