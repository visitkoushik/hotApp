import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReportsPageRoutingModule } from './reports-routing.module';

import { ReportsPage } from './reports.page';
import { PipeModule } from '../pipe/pipe.module';
import { MaterialModule } from '../material.module';
import { ProfitlossComponent } from './profitloss/profitloss.component';
import { ItemProfitComponent } from './item-profit/item-profit.component';
import { YearPickerComponent } from '../custom-mat-picker/year-picker/year-picker.component';
import { AppModule } from '../app.module';
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
    MonthPickerModule

  ],
  declarations: [ReportsPage]
})
export class ReportsPageModule {}
