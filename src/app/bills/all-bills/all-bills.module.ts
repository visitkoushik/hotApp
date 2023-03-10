import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllBillsPageRoutingModule } from './all-bills-routing.module';

import { AllBillsPage } from './all-bills.page';
import { PipeModule } from '../../pipe/pipe.module';
import { MaterialModule } from '../../material.module';
import { BranchSelectorModule } from 'src/app/branch-selector/branch-selector.module';
import { UpdateBillComponent } from './update-bill/update-bill.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllBillsPageRoutingModule,
    PipeModule,
    BranchSelectorModule,
    MaterialModule,
  ],
  declarations: [AllBillsPage, UpdateBillComponent],
})
export class AllBillsPageModule {}
