import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';
import { ShortDatePipe } from 'src/app/pipe/short-date.pipe';
import { CartService } from 'src/app/providers/cart-service.service';
import { HttpService } from 'src/app/providers/http.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Entries } from 'src/model/entries';
import { FILTER_BY } from 'src/model/util';

@Component({
  selector: 'app-overall',
  templateUrl: './overall.page.html',
  styleUrls: ['./overall.page.scss'],
})
export class OverallPage implements OnInit {
  public startDate: string = null;
  public endDate: string = null;
  public selectedReport = '-1';
  public filterDateBy: FILTER_BY;

  public pageheading: string | Date = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FILTERBY = FILTER_BY;
  public itemName = '';
  // public allItems: I_Items[] = [];
  public reportResultBalance: I_Entries[] = [];
  public totalProfit = 0;

  public displayedColumns = ['detail', 'value'];

  public start: Date = null;
  public end: Date = null;
  public currentMaxPage = this.util.maxPageCountReport;
  public transform = new ConvertToFullDate().transform;
  public total: number = 0;

  constructor(private activeRoute: ActivatedRoute, private util: UtilService) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      const p = JSON.parse(param.p);
      this.reportResultBalance = [...JSON.parse(param.r).responseObject];
      this.startDate = p.startDate;
      this.endDate = p.endDate;
      this.selectedReport = p.selectedReport;
      this.filterDateBy = +p.filterDateBy;
      this.currentMaxPage = this.util.maxPageCountReport;
      const shortDate = new ShortDatePipe();
      const stdt = shortDate.transform(new Date(this.startDate));
      const nddt = shortDate.transform(new Date(this.endDate));
      this.pageheading =
        (this.filterDateBy === FILTER_BY.DATE ? stdt : this.startDate) +
        ' - ' +
        (this.filterDateBy === FILTER_BY.DATE ? nddt : this.endDate);
      // this.fetchData();
    });

   this.reportResultBalance.forEach((e: I_Entries) => {
      this.total += e.type == 'Cr' ? e.value : -e.value;
    });
  }
}
