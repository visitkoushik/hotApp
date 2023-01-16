import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { YearPickerComponent } from './year-picker.component';
import { MaterialModule } from '../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { PipeModule } from '../../pipe/pipe.module';

@NgModule({
  declarations: [YearPickerComponent],

  imports: [
    CommonModule,
    MaterialModule,
    PipeModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
  exports: [YearPickerComponent],
})
export class YearPickerModule {}
