import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShowItemReportsPageRoutingModule } from './show-item-reports-routing.module';

import { ShowItemReportsPage } from './show-item-reports.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MaterialModule } from 'src/app/material.module';
import { ItemProfitComponent } from '../item-profit/item-profit.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShowItemReportsPageRoutingModule,
    PipeModule,
    MaterialModule,
  ],
  declarations: [ShowItemReportsPage, ItemProfitComponent],
})
export class ShowItemReportsPageModule {}
