import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CreateBillPageRoutingModule } from './create-bill-routing.module';

import { CreateBillPage } from './create-bill.page';
import { MaterialModule } from '../material.module';
import { PipeModule } from '../pipe/pipe.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CreateBillPageRoutingModule,
    MaterialModule,
    PipeModule,
  ],
  declarations: [CreateBillPage]

})
export class CreateBillPageModule {}
