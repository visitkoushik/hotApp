import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ConfiremdBillPage } from '../confirmed-bill/confirmed-bill';
import { ConfiremedbillPageRoutingModule } from './confirmed-routing.module copy';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ConfiremedbillPageRoutingModule,
    MaterialModule,
    PipeModule
  ],
  declarations: [ConfiremdBillPage]
})
export class ConfiremedbillPageModule {}
