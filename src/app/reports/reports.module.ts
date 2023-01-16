import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { PipeModule } from '../pipe/pipe.module';
import { MaterialModule } from '../material.module';
import { YearPickerModule } from '../custom-mat-picker/year-picker/year-picker.module';
import { MonthPickerModule } from '../custom-mat-picker/month-picker/month-picker.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReportsPageRoutingModule,
    PipeModule,
    MaterialModule,
    YearPickerModule,
    ReactiveFormsModule,
    MonthPickerModule

  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
