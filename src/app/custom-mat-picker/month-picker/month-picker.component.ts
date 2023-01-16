import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';
import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';

@Component({
  selector: 'app-month-picker',
  templateUrl: './month-picker.component.html',
  styleUrls: ['./month-picker.component.scss'],
})
export class MonthPickerComponent implements OnInit, AfterViewInit {
  @Input() label: string;
  @Input() startMonth: string;
  @Input() endMonth: string;

  @Output() startMonthChange = new EventEmitter<string>();
  @Output() endMonthChange = new EventEmitter<string>();
  @ViewChild('mesIni') mesIni: ElementRef<HTMLInputElement>;
  @ViewChild('mesFin') mesFin: ElementRef<HTMLInputElement>;
  convertFullDate = new ConvertToFullDate();
  mclick = 0;

  public maxDate: Date = null;
  ngOnInit() {
    this.maxDate = new Date();
  }
  ngAfterViewInit(): void {
    if (!this.startMonth || !this.endMonth) {
      return;
    }
    setTimeout(() => {
      this.mesIni.nativeElement.value = this.startMonth.trim();
      this.startMonthChange.emit(this.startMonth);

      document
        .getElementsByClassName('monthtoggle')[0]
        .getElementsByTagName('input')[1]
        .focus();
      var inter = setInterval(() => {
        clearInterval(inter);
        setTimeout(() => {
          if (this.startMonth > this.endMonth) {
            const startMonth1 = this.startMonth;
            const endMonth1 = this.endMonth;

            this.startMonth = endMonth1;
            this.endMonth = startMonth1;

            this.mesIni.nativeElement.value = this.startMonth.trim();
            this.startMonthChange.emit(this.startMonth);

            this.mesFin.nativeElement.value = this.endMonth.trim();
            this.endMonthChange.emit(this.endMonth);
          }

          this.mesIni.nativeElement.value = this.startMonth.trim();
          this.mesFin.nativeElement.value = this.endMonth.trim();
          this.endMonthChange.emit(this.endMonth);

          this.mclick = 0;
          document
            .getElementsByClassName('monthtoggle')[0]
            .getElementsByTagName('input')[1]
            .blur();
        }, 0);
      }, 10);
    }, 0);
  }
  public chosenHandler(
    normalizedMonth: Date,
    datepicker: MatDatepicker<any>
  ): void {
    // console.log(normalizedMonth, datepicker, mesIni);
    this.mclick++;
    if (this.mclick === 1) {
      this.startMonth = `${normalizedMonth.toLocaleDateString('en', {
        month: 'short',
      })}/${normalizedMonth.getFullYear()}`;
      this.mesIni.nativeElement.value = this.startMonth;
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
      this.endMonth = `${normalizedMonth.toLocaleDateString('en', {
        month: 'short',
      })}/${normalizedMonth.getFullYear()}`;

      const stMon: Date = this.convertFullDate.transform(this.startMonth, [
        'M',
      ]) as Date;
      const enMon: Date = this.convertFullDate.transform(this.startMonth, [
        'M',
      ]) as Date;

      if (stMon > enMon) {
        const startMonth1 = this.startMonth;
        const endMonth1 = this.endMonth;

        this.startMonth = endMonth1;
        this.endMonth = startMonth1;

        this.mesIni.nativeElement.value = this.startMonth;
        this.startMonthChange.emit(this.startMonth);
        this.mesFin.nativeElement.value = this.startMonth;
        this.endMonthChange.emit(this.endMonth);
      }

      this.mesFin.nativeElement.value = this.endMonth;
      this.endMonthChange.emit(this.endMonth);
      datepicker.close();
      this.mclick = 0;
    }
  }
}
