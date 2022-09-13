import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
})
export class DateformatPipe implements PipeTransform {
  transform(
    value: Date,
    ...args: unknown[]
  ): { date: string; time: string } | string {
    if (value) {
      value = new Date(value);
      if (args[0] && args[0] === 'date') {
        return value.toLocaleDateString();
      } else if (args[0] && args[0] === 'time') {
        return value.toLocaleTimeString();
      }
      return {
        date: `${value.toLocaleDateString()}`,
        time: `${value.toLocaleTimeString()}`,
      };
    }
    return '';
  }
}
