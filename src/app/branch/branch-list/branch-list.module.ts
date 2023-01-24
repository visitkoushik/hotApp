import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BranchListPageRoutingModule } from './branch-list-routing.module';

import { BranchListPage } from './branch-list.page';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    PipeModule,
    BranchListPageRoutingModule
  ],
  declarations: [BranchListPage]
})
export class BranchListPageModule {}
