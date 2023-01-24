import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateBranchPageRoutingModule } from './update-branch-routing.module';

import { UpdateBranchPage } from './update-branch.page';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,

    ReactiveFormsModule,
    MaterialModule,
    PipeModule,
    UpdateBranchPageRoutingModule
  ],
  declarations: [UpdateBranchPage]
})
export class UpdateBranchPageModule {}
