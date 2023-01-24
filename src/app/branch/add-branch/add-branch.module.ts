import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddBranchPageRoutingModule } from './add-branch-routing.module';

import { AddBranchPage } from './add-branch.page';
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
    AddBranchPageRoutingModule,
  ],
  declarations: [AddBranchPage],
})
export class AddBranchPageModule {}
