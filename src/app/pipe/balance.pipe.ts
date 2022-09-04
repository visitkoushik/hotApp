import { Pipe, PipeTransform } from '@angular/core';

import { I_ReportResult } from 'src/model/ClassBalance';

@Pipe({
  name: 'checkbalance',
})
export class BalanceSheetPipe implements PipeTransform {
  transform(
    value: I_ReportResult[],
    ...args: unknown[]
  ): { sell: number; profit: number } {
    let profit = 0;
    let sell = 0;
    if (value && Array.isArray(value)) {
      value.forEach((p) => {
        profit += p.profit;
        sell += p.allSellValue;
      });
    }

    return { sell, profit };
  }
}
