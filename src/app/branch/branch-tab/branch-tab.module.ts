import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchTabPageRoutingModule } from './branch-tab-routing.module';

import { BranchTabPage } from './branch-tab.page';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    ReactiveFormsModule,
    PipeModule,
    BranchTabPageRoutingModule
  ],
  declarations: [BranchTabPage]
})
export class BranchTabPageModule {}
