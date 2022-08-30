import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NewbillPageRoutingModule } from './newbill-routing.module';

import { NewbillPage } from './newbill.page';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { ConfiremdBillPage } from '../confirmed-bill/confirmed-bill';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NewbillPageRoutingModule,
    MaterialModule,
    PipeModule
  ],
  declarations: [NewbillPage]
})
export class NewbillPageModule {}
