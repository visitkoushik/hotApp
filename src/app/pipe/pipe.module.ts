import { NgModule } from '@angular/core';
import { FilterPipe } from './filter.pipe';
import { FormatGenderPipe } from './genderFormat';
import { SubtotalPipe } from './subtotal.pipe';
import { DateformatPipe } from './dateformat.pipe';
import { BalanceSheetPipe } from './balance.pipe';
import { ConvertToFullDate } from './convert-to-fulldate';
import { ShortDatePipe } from './short-date.pipe';
import { ToItemPipe } from './to-item.pipe';


@NgModule({
  declarations:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
    BalanceSheetPipe,
    ConvertToFullDate,
    ShortDatePipe,
    ToItemPipe
  ],
  exports:[
    SubtotalPipe,
    FilterPipe,
    FormatGenderPipe,
    DateformatPipe,
    BalanceSheetPipe,
    ConvertToFullDate,
    ShortDatePipe,
    ToItemPipe

  ],
})

export class PipeModule{}
