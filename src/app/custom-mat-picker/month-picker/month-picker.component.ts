import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
})
export class MonthPickerComponent implements OnInit {
  @Input() label: string;
  @Input() startMonth: string;
  @Input() endMonth: string;

  @Output() startMonthChange = new EventEmitter<string>();
  @Output() endMonthChange = new EventEmitter<string>();

  convertFullDate = new ConvertToFullDate();
  mclick = 0;

  public maxDate: Date = null;
  ngOnInit() {
    this.maxDate = new Date();
  }

  public chosenHandler(
    normalizedMonth: Date,
    datepicker: MatDatepicker<any>,
    mesIni: any,
    mesFin: any
  ): void {
    // console.log(normalizedMonth, datepicker, mesIni);
    this.mclick++;
    if (this.mclick === 1) {
      this.startMonth = `${normalizedMonth.toLocaleDateString('default', {
        month: 'short',
      })}/${normalizedMonth.getFullYear()}`;
      mesIni.value = this.startMonth;
      this.startMonthChange.emit(this.startMonth);
      datepicker.close();
      //It can improve
      // eslint-disable-next-line no-var
      var inter = setInterval(() => {
        const htmlElem: HTMLCollectionOf<HTMLElement> = document
          .getElementsByClassName('monthtoggle')[0]
          .getElementsByClassName(
            'mat-focus-indicator mat-icon-button mat-button-base'
          ) as HTMLCollectionOf<HTMLElement>;
        document
          .getElementsByClassName('monthtoggle')[0]
          .getElementsByTagName('input')[1]
          .focus();
        //Here it is important to put the id of the element that is clicked to open the calendar
        htmlElem[0].click();
        clearInterval(inter);
      }, 50);
    } else if (this.mclick === 2) {
      this.endMonth = `${normalizedMonth.toLocaleDateString('default', {
        month: 'short',
      })}/${normalizedMonth.getFullYear()}`;

      const stMon: Date = this.convertFullDate.transform(this.startMonth, [
        'M',
      ]);
      const enMon: Date = this.convertFullDate.transform(this.startMonth, [
        'M',
      ]);

      if (stMon > enMon) {
        const startMonth1 = this.startMonth;
        const endMonth1 = this.endMonth;

        this.startMonth = endMonth1;
        this.endMonth = startMonth1;

        mesIni.value = this.startMonth;
        this.startMonthChange.emit(this.startMonth);
        mesFin.value = this.startMonth;
        this.endMonthChange.emit(this.endMonth);
      }

      mesFin.value = this.endMonth;
      this.endMonthChange.emit(this.endMonth);
      datepicker.close();
      this.mclick = 0;
    }
  }
}
