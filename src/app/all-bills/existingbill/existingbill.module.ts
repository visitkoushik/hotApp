import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExistingbillPageRoutingModule } from './existingbill-routing.module';

import { ExistingbillPage } from './existingbill.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ExistingbillPageRoutingModule,
    PipeModule,
    MaterialModule
  ],
  declarations: [ExistingbillPage]
})
export class ExistingbillPageModule {}
