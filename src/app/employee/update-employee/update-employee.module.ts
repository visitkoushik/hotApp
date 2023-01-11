import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpdateEmployeePageRoutingModule } from './update-employee-routing.module';

import { UpdateEmployeePage } from './update-employee.page';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    MaterialModule,
    PipeModule,
    UpdateEmployeePageRoutingModule
  ],
  declarations: [UpdateEmployeePage, ResetPasswordComponent]
})
export class UpdateEmployeePageModule {}
