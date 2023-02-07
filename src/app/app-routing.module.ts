import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AppStorageService } from './app-storage/app-storage.service';
import { OwnerGaurdService } from './employee/ownergurd.service';
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
    canLoad: [AuthGaurdService],
  },
  {
    path: 'allbills',
    loadChildren: () =>
      import('./bills/all-bills/all-bills.module').then(
        (m) => m.AllBillsPageModule
      ),
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
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginPageModule),
    canLoad: [OwnerGaurdService],
  },
  {
    path: 'tab-item',
    loadChildren: () =>
      import('./items/tab-item/tab-item.module').then(
        (m) => m.TabItemPageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'add-item',
    loadChildren: () =>
      import('./items/add-item/add-item.module').then(
        (m) => m.AddItemPageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'item-list',
    loadChildren: () =>
      import('./items/item-list/item-list.module').then(
        (m) => m.ItemListPageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'add-category',
    loadChildren: () =>
      import('./items/add-category/add-category.module').then(
        (m) => m.AddCategoryPageModule
      ),
  },
  {
    path: 'employee',
    loadChildren: () =>
      import('./employee/addEmployee/employee-add.module').then(
        (m) => m.EmployeeAddPageModule
      ),
  },
  {
    path: 'employee-list',
    loadChildren: () =>
      import('./employee/employee-list/employee-list.module').then(
        (m) => m.EmployeeListPageModule
      ),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfilePageModule),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'employee-tab',
    loadChildren: () =>
      import('./employee/employee-tab/employee-tab.module').then(
        (m) => m.EmployeeTabPageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'update-employee',
    loadChildren: () =>
      import('./employee/update-employee/update-employee.module').then(
        (m) => m.UpdateEmployeePageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'branch-tab',
    loadChildren: () =>
      import('./branch/branch-tab/branch-tab.module').then(
        (m) => m.BranchTabPageModule
      ),
    canLoad: [AuthGaurdService],
  },
  {
    path: 'add-branch',
    loadChildren: () =>
      import('./branch/add-branch/add-branch.module').then(
        (m) => m.AddBranchPageModule
      ),
      canLoad: [AuthGaurdService],
  },
  {
    path: 'branch-list',
    loadChildren: () =>
      import('./branch/branch-list/branch-list.module').then(
        (m) => m.BranchListPageModule
      ),
      canLoad: [AuthGaurdService],
  },
  {
    path: 'update-branch',
    loadChildren: () =>
      import('./branch/update-branch/update-branch.module').then(
        (m) => m.UpdateBranchPageModule
      ),
      canLoad: [AuthGaurdService],
  },
  {
    path: 'other-expenses',
    loadChildren: () =>
      import('./other-expenses/other-expenses.module').then(
        (m) => m.OtherExpensesPageModule
      ),
    canLoad: [AuthGaurdService],
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
