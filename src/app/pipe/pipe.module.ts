import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FormatGenderPipe } from './genderFormat';
import { SubtotalPipe } from './subtotal.pipe';
import { DateformatPipe } from './dateformat.pipe';
import { BalanceSheetPipe } from './balance.pipe';
import { ConvertToFullDate } from './convert-to-fulldate';
import { ShortDatePipe } from './short-date.pipe';


@NgModule({
  declarations:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
    BalanceSheetPipe,
    ConvertToFullDate,
    ShortDatePipe
  ],
  exports:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
    BalanceSheetPipe,
    ConvertToFullDate,
    ShortDatePipe

  ],
})

export class PipeModule{}
