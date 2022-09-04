import { Pipe, PipeTransform } from '@angular/core';
import { I_CartItem } from 'src/model/cartItem';
import { UtilClass } from 'src/model/util';

@Pipe({
  name: 'subtotal',
})
export class SubtotalPipe implements PipeTransform {
  transform(value: I_CartItem[], ...args: string[]): string {
    // let price = 0;
    let adjust = 0;
    adjust = args[1] ? +args[1] : 0;

    const price = args[0] === 'count'
      ? UtilClass.Get_Item_Count(value)+''
      : (UtilClass.Get_Total(value) - adjust)+'';

      return price;
  }
}
