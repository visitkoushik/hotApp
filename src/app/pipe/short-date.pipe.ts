import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortDate'
})
export class ShortDatePipe implements PipeTransform {

  transform(value: Date, ...args: unknown[]): string {
    if(value instanceof (Date)){
     return `${(value.getDate().toString().padStart(2,'0'))}/${(value.getMonth()+1).toString().padStart(2,'0')}/${value.getFullYear()}`;
    }
    else{
      return value;
    }
  }

}
