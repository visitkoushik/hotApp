import { Pipe, PipeTransform } from '@angular/core';
import { GENDER } from 'src/model/util';

@Pipe({
  name: 'formatgender',
})
export class FormatGenderPipe implements PipeTransform {
  transform(value: GENDER|string, ...args: any[]): string {
    switch (GENDER[value.toString().toUpperCase()]) {
      case GENDER.FEMALE:
        return 'Ms.';
      case GENDER.MALE:
        return 'Mr.';
      case GENDER.OTHERS:
        return 'Mx.';
      default:
        return '';
    }
  }
}
