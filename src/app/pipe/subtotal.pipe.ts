import { Pipe, PipeTransform } from '@angular/core';
import { I_CartItem } from 'src/model/cartItem';

@Pipe({
  name: 'subtotal',
})
export class SubtotalPipe implements PipeTransform {
  transform(value: I_CartItem[], ...args: string[]): string {
    let price = 0;
    let adjust = 0;
    adjust = args[1] ? +args[1] : 0;
    if (value && value.length > 0) {
      value.forEach((e: I_CartItem) => {
        if (args[0] === 'count') {
          price = price + e.count;
        } else {
          if (e.items.discountInPercent) {
            price = price + e.count * e.items.itemSellValue;
          } else {
            price =
              price +
              (e.count *
                e.items.itemSellValue *
                (100 - e.items.itemSellDiscount)) /
                100;
          }
        }
      });
      price = price - adjust;
    }
    return args[0] === 'count' ? price.toFixed(0) : price.toFixed(2);
  }
}
