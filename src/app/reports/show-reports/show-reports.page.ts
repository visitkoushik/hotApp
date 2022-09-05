import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShortDatePipe } from 'src/app/pipe/short-date.pipe';
import { FILTER_BY } from 'src/model/util';

@Component({
  selector: 'app-show-reports',
  templateUrl: './show-reports.page.html',
  styleUrls: ['./show-reports.page.scss'],
})
export class ShowReportsPage implements OnInit {
  public startDate: Date = null;
  public endDate: Date = null;
  public selectedReport = '-1';
  public filterDateBy: FILTER_BY;

  public pageheading = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FILTERBY = FILTER_BY;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      this.startDate = p.startDate;
      this.endDate = p.endDate;
      this.selectedReport = p.selectedReport;
      this.filterDateBy = +p.filterDateBy;

      const shortDate =new ShortDatePipe();
      const stdt = shortDate.transform(new Date(this.startDate) );
      const nddt = shortDate.transform(new Date(this.endDate)) ;
      this.pageheading =
        (this.filterDateBy === FILTER_BY.DATE ? stdt : this.startDate) +
        ' - ' +
        (this.filterDateBy === FILTER_BY.DATE ? nddt : this.endDate);
    });
  }
}
