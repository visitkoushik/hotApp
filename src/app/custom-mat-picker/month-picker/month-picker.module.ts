import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MonthPickerComponent } from './month-picker.component';
import { MaterialModule } from 'src/app/material.module';
import { PipeModule } from 'src/app/pipe/pipe.module';

@NgModule({
  declarations: [MonthPickerComponent],
  imports: [CommonModule, MaterialModule, PipeModule],
  exports: [MonthPickerComponent],
})
export class MonthPickerModule {}
