import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBillPageRoutingModule } from './create-bill-routing.module';

import { CreateBillPage } from './create-bill.page';
import { MaterialModule } from '../../material.module';
import { PipeModule } from '../../pipe/pipe.module';
import { AppStorageModule } from '../../app-storage/app-storage.module';
import { BranchSelectorModule } from 'src/app/branch-selector/branch-selector.module';
import { BranchSelectorComponent } from 'src/app/branch-selector/branch-selector.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBillPageRoutingModule,
    MaterialModule,
    PipeModule,
    BranchSelectorModule,
  ],
  declarations: [CreateBillPage],
})
export class CreateBillPageModule {}
