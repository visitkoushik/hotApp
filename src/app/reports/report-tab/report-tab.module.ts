import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportTabPageRoutingModule } from './report-tab-routing.module';

import { ReportTabPage } from './report-tab.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportTabPageRoutingModule
  ],
  declarations: [ReportTabPage]
})
export class ReportTabPageModule {}
