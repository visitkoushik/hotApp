import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateconvert',
})
export class ConvertToFullDate implements PipeTransform {

  transform(value: string, ...args: any[]): Date {

    if (args && args[0]) {
      if (args[0] === 'Y') {
        if (args[1] === 'e') {
          return new Date(+value, 11, 31);
        }
        return new Date(+value, 0, 1);
      }
      if (args[0] === 'M') {
        const year = +value.split('/')[1];
        let febDateofLeapyear = 28;
        if (year % 4 === 0 && year % 400 !== 0) {
          febDateofLeapyear = 29;
        }
        const datescope = [
          31,
          febDateofLeapyear,
          31,
          30,
          31,
          30,
          31,
          31,
          30,
          31,
          30,
          31,
        ];
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

        const monthindex = MMM.indexOf(value.split('/')[0]);
        if (args[1] === 'e') {
          return new Date(year, monthindex, datescope[monthindex]);
        }
        return new Date(year, monthindex, 1);
      }
    }
  }
}
