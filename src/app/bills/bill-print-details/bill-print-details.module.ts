import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { BillPrintDetailsComponent } from './bill-print-details.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    PipeModule
  ],
  exports:[BillPrintDetailsComponent],
  declarations: [BillPrintDetailsComponent]

})


export class BillPrintDetailsModule { }
