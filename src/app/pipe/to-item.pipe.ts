import { Pipe, PipeTransform } from '@angular/core';
import { I_CartItem } from 'src/model/cartItem';
import { I_Items } from 'src/model/items';
import { CartService } from '../providers/cart-service.service';

@Pipe({
  name: 'toItem',
})
export class ToItemPipe implements PipeTransform {
  constructor(private cartsrvc: CartService) {}
  transform(value: I_CartItem, ...args: unknown[]): I_Items | undefined {
    return this.cartsrvc.mainItems.find((e) => e.itemId === value.items);
  }
}
