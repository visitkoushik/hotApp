import { Pipe, PipeTransform, Type } from '@angular/core';
import { I_CartItem } from 'src/model/cartItem';
import { I_Items } from 'src/model/items';
import { CartService } from '../providers/cart-service.service';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  constructor(private cartsrvc: CartService) {}
  transform(value: any[], ...args: string[]): any[] {
    if (Array.isArray(value) && args && args[0]?.trim()) {
      if (!('itemName' in (value[0] as any))) {
        return (
          (value as I_CartItem[]).filter(
            (e) =>
              e.items?.itemName ||
              ''.toLowerCase().includes(args[0].toLowerCase())
          ) || [...value]
        );
      } else if ('itemName' in (value[0] as any)) {
        return (
          (value as I_Items[]).filter((e) =>
            e.itemName.toLowerCase().includes(args[0].toLowerCase())
          ) || [...value]
        );
      }
    }
    return Array.isArray(value) ? [...value] : [];
  }
}
