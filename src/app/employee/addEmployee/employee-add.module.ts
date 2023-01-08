import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EmployeeAddPageRoutingModule } from './employee-add-routing.module';

import { EmployeeAddPage } from './employee-add.page';
import { MaterialModule } from '../../material.module';
import { PipeModule } from '../../pipe/pipe.module';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    PipeModule,
    EmployeeAddPageRoutingModule,

  ],
  declarations: [EmployeeAddPage],
})
export class EmployeeAddPageModule {}
