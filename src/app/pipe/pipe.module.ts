import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FormatGenderPipe } from './genderFormat';
import { SubtotalPipe } from './subtotal.pipe';
import { DateformatPipe } from './dateformat.pipe';


@NgModule({
  declarations:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
  ],
  exports:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
  ],
})

export class PipeModule{}
