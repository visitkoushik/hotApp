import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowItemReportsPageRoutingModule } from './show-item-reports-routing.module';

import { ShowItemReportsPage } from './show-item-reports.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowItemReportsPageRoutingModule
  ],
  declarations: [ShowItemReportsPage]
})
export class ShowItemReportsPageModule {}
