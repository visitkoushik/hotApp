import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateformat',
})
export class DateformatPipe implements PipeTransform {
  transform(value: Date, ...args: unknown[]): { date: string; time: string } {
    if (value) {
      value = new Date(value);

      return {
        date: `${value.toLocaleDateString()}`,
        time: `${value.toLocaleTimeString()}`,
      };
    }
    return { date: '', time: '' };
  }
}
