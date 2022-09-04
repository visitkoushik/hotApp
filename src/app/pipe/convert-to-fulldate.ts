import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateconvert',
})
export class ConvertToFullDate implements PipeTransform {
  transform(value: string, ...args: any[]): Date {
    if (args && args[0]) {
      if (args[0] === 'Y') {
        return new Date(+value, 1);
      }
      if (args[0] === 'M') {
        const MMM = [
          'Jan',
          'Feb',
          'Mar',
          'Apr',
          'May',
          'Jun',
          'Jul',
          'Aug',
          'Sept',
          'Oct',
          'Nov',
          'Dec',
        ];
        return new Date(+value.split('/')[1], MMM.indexOf(value.split('/')[0]));
      }
    }
  }
}
