import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tab',
    pathMatch: 'full',
  },
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then((m) => m.TabPageModule),
  },
  {
    path: 'allbills',
    loadChildren: () =>
      import('./all-bills/all-bills.module').then((m) => m.AllBillsPageModule),
  },
  {
    path: 'createbill',
    loadChildren: () =>
      import('./create-bill/create-bill.module').then(
        (m) => m.CreateBillPageModule
      ),
  },
  {
    path: 'configure',
    loadChildren: () =>
      import('./configure/configure.module').then((m) => m.ConfigurePageModule),
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsPageModule),
  },
  {
    path: 'appsetting',
    loadChildren: () =>
      import('./appsetting/appsetting.module').then(
        (m) => m.AppsettingPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
