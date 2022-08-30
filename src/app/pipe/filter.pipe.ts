import { Pipe, PipeTransform } from '@angular/core';
import { I_CartItem } from 'src/model/cartItem';

@Pipe({
  name: 'filter',
})
export class FilterPipe implements PipeTransform {
  transform(value: I_CartItem[], ...args: string[]): I_CartItem[] {
    if (value && value.length > 0 && args && args[0]?.trim()) {
      return (
        value.filter((e) =>
          e.items.itemName.toLowerCase().includes(args[0].toLowerCase())
        ) || [...value]
      );
    }
    return Array.isArray(value)?[...value]:[];
  }
}
