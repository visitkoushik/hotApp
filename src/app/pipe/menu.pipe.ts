import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../providers/utilservice.service';

@Pipe({
  name: 'menu',
})
export class MenuPipe implements PipeTransform {
  transform(
    value: { name: string; value: string }[],
    ...args: string[]
  ): boolean {
    if (Array.isArray(value) && args && args[0]?.trim()) {
      return value.findIndex((v) => v.name == args[0]) > -1;
    }
    return false;
  }
}
