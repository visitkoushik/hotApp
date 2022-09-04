import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MatDatepicker } from '@angular/material/datepicker';

@Component({
  selector: 'app-year-picker',
  templateUrl: './year-picker.component.html',
  styleUrls: ['./year-picker.component.scss'],
})
export class YearPickerComponent implements OnInit {
  @Input() label: string;
  @Input() startYear: string;
  @Input() endYear: string;

  @Output() startYearChange = new EventEmitter<string>();
  @Output() endYearChange = new EventEmitter<string>();

  mclick = 0;

  ngOnInit() {}

  public chosenHandler(
    normalizedMonth: Date,
    datepicker: MatDatepicker<any>,
    mesIni: any,
    mesFin: any
  ): void {
    // console.log(normalizedMonth, datepicker, mesIni);
    this.mclick++;
    if (this.mclick === 1) {
      this.startYear = `${normalizedMonth.getFullYear()}`;
      mesIni.value = this.startYear;
      this.startYearChange.emit(this.startYear);
      datepicker.close();
      //It can improve
      // eslint-disable-next-line no-var
      var inter = setInterval(() => {
        const htmlElem: HTMLCollectionOf<HTMLElement> = document
          .getElementsByClassName('yeartoggle')[0]
          .getElementsByClassName(
            'mat-focus-indicator mat-icon-button mat-button-base'
          ) as HTMLCollectionOf<HTMLElement>;
        document
          .getElementsByClassName('yeartoggle')[0]
          .getElementsByTagName('input')[1]
          .focus();
        //Here it is important to put the id of the element that is clicked to open the calendar
        htmlElem[0].click();
        clearInterval(inter);
      }, 50);
    } else if (this.mclick === 2) {
      this.endYear = `${normalizedMonth.getFullYear()}`;

      if (this.startYear > this.endYear) {
        const startYear1 = this.startYear;
        const endYear1 = this.endYear;

        this.startYear = endYear1;
        this.endYear = startYear1;

        mesIni.value = this.startYear;
        this.startYearChange.emit(this.startYear);
        mesFin.value = this.startYear;
        this.endYearChange.emit(this.endYear);
      }

      mesFin.value = this.endYear;
      this.endYearChange.emit(this.endYear);
      datepicker.close();
      this.mclick = 0;
    }
  }
}
