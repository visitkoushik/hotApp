import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FormatGenderPipe } from './genderFormat';
import { SubtotalPipe } from './subtotal.pipe';
import { DateformatPipe } from './dateformat.pipe';
import { BalanceSheetPipe } from './balance.pipe';
import { ConvertToFullDate } from './convert-to-fulldate';


@NgModule({
  declarations:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
    BalanceSheetPipe,
    ConvertToFullDate
  ],
  exports:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
    BalanceSheetPipe,
    ConvertToFullDate

  ],
})

export class PipeModule{}
