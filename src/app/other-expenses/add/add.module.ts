import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPageRoutingModule } from './add-routing.module';

import { AddPage } from './add.page';
import { MaterialModule } from 'src/app/material.module';
import { BranchSelectorModule } from 'src/app/branch-selector/branch-selector.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    BranchSelectorModule,
    AddPageRoutingModule,
  ],
  declarations: [AddPage],
})
export class AddPageModule {}
