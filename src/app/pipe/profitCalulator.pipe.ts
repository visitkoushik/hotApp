import { Pipe, PipeTransform } from '@angular/core';
import { I_BillingReq } from 'src/model/BillingReq';

@Pipe({
  name: 'profitcalc',
})
export class ProfitCalculator implements PipeTransform {
  transform(iBillsReq: I_BillingReq[], ...args: string[]): string {
    // let price = 0;

    let price = 0;
    iBillsReq.forEach((iB: I_BillingReq) => {
      price += iB.Stotal - iB.Ptotal - iB.discount;
    });
    return price+"";
  }
}
