import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FILTER_BY } from 'src/model/util';

@Component({
  selector: 'app-show-item-reports',
  templateUrl: './show-item-reports.page.html',
  styleUrls: ['./show-item-reports.page.scss'],
})
export class ShowItemReportsPage implements OnInit {
  public startDate: Date = null;
  public endDate: Date = null;
  public selectedReport = '-1';
  public filterDateBy: FILTER_BY;

  // eslint-disable-next-line @typescript-eslint/naming-convention
  FILTERBY = FILTER_BY;
  constructor(private activeRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      debugger
      this.startDate = p.startDate;
      this.endDate = p.endDate;
      this.selectedReport = p.selectedReport;
      this.filterDateBy = +p.filterDateBy;
    });
  }
}
