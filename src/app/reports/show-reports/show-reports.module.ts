import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowReportsPageRoutingModule } from './show-reports-routing.module';

import { ShowReportsPage } from './show-reports.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MaterialModule } from 'src/app/material.module';
import { ProfitlossComponent } from '../profitloss/profitloss.component';
import { ItemProfitComponent } from '../item-profit/item-profit.component';
import { PeriodProfitlossComponent } from '../period-profitloss/period-profitloss.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowReportsPageRoutingModule,
    PipeModule,
    MaterialModule,
  ],
  declarations: [
    ShowReportsPage,
    ProfitlossComponent,
    ItemProfitComponent,
    PeriodProfitlossComponent,
  ],
})
export class ShowReportsPageModule {}
