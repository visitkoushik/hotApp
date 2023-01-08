import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeTabPageRoutingModule } from './employee-tab-routing.module';

import { EmployeeTabPage } from './employee-tab.page';
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
    EmployeeTabPageRoutingModule
  ],
  declarations: [EmployeeTabPage]
})
export class EmployeeTabPageModule {}
