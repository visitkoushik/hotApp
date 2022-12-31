import { Pipe, PipeTransform } from '@angular/core';
import { I_CartItem } from 'src/model/cartItem';
import { UtilClass } from 'src/model/util';
import { CartService } from '../providers/cart-service.service';

@Pipe({
  name: 'subtotal',
})
export class SubtotalPipe implements PipeTransform {
  constructor(private cartsrvc: CartService) {}
  transform(value: I_CartItem[], ...args: string[]): string {
    // let price = 0;
    let adjust = 0;
    adjust = args[1] ? +args[1] : 0;
    const price =
      args[0] === 'count'
        ? UtilClass.Get_Item_Count(value) + ''
        : args[0] === 'discount'
        ? UtilClass.Get_Total(this.cartsrvc, value).totalDiscount + adjust + ''
        : UtilClass.Get_Total(this.cartsrvc, value).price - adjust + '';
    return price;
  }
}
