import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllBillsPageRoutingModule } from './all-bills-routing.module';

import { AllBillsPage } from './all-bills.page';
import { PipeModule } from '../pipe/pipe.module';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllBillsPageRoutingModule,
    PipeModule,
    MaterialModule
  ],
  declarations: [AllBillsPage]
})
export class AllBillsPageModule {}
