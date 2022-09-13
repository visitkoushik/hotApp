import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppStorageService } from './app-storage/app-storage.service';
import { AuthGaurdService } from './providers/auth/auth-gaurd.service';
import { AuthService } from './providers/auth/auth.service';
import { TanGaurdService } from './providers/company/tan-gaurd.service';
import { UtilService } from './providers/utilservice.service';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'tab',
    pathMatch: 'full',
  },
  {
    path: 'tab',
    loadChildren: () => import('./tab/tab.module').then((m) => m.TabPageModule),
    canLoad: [TanGaurdService],
    providers: [TanGaurdService]
  },
  {
    path: 'allbills',
    loadChildren: () =>
      import('./bills/all-bills/all-bills.module').then((m) => m.AllBillsPageModule),
  },
  {
    path: 'createbill',
    loadChildren: () =>
      import('./bills/create-bill/create-bill.module').then(
        (m) => m.CreateBillPageModule
      ),
  },
  {
    path: 'configure',
    loadChildren: () =>
      import('./configure/configure.module').then((m) => m.ConfigurePageModule),

  },

  {
    path: 'configures',
    loadChildren: () =>
      import('./configure/configure.module').then((m) => m.ConfigurePageModule),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'reports',
    loadChildren: () =>
      import('./reports/reports.module').then((m) => m.ReportsPageModule),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'appsetting',
    loadChildren: () =>
      import('./appsetting/appsetting.module').then(
        (m) => m.AppsettingPageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'tab-item',
    loadChildren: () => import('./items/tab-item/tab-item.module').then( m => m.TabItemPageModule),
    canLoad: [AuthGaurdService]
  },
  {
    path: 'add-item',
    loadChildren: () => import('./items/add-item/add-item.module').then( m => m.AddItemPageModule),
    canLoad: [AuthGaurdService]
  },
  {
    path: 'item-list',
    loadChildren: () => import('./items/item-list/item-list.module').then( m => m.ItemListPageModule),
    canLoad: [AuthGaurdService]
  },
  {
    path: 'add-category',
    loadChildren: () => import('./items/add-category/add-category.module').then( m => m.AddCategoryPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
