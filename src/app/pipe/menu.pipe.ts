import { Pipe, PipeTransform } from '@angular/core';
import { UtilService } from '../providers/utilservice.service';

@Pipe({
  name: 'menu',
})
export class MenuPipe implements PipeTransform {
  transform(
    value: { name: string; value: string }[],
    ...args: string[]
  ): boolean | string {
    if (Array.isArray(value) && args && args[0]?.trim() && !args[1]) {
      return value.findIndex((v) => v.name == args[0]) > -1;
    } else if (
      Array.isArray(value) &&
      args &&
      args[0]?.trim() &&
      args[1]?.trim() === 'true'
    ) {
      return value.find((v) => v.name == args[0]).value;
    }

    return false;
  }
}
