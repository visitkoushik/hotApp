import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { ShortDatePipe } from 'src/app/pipe/short-date.pipe';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_BillingReq } from 'src/model/BillingReq';
import { I_ReportFilter } from 'src/model/ReportFilter';
import { I_ReportsResp } from 'src/model/ReportFilterResp';
import { ApiEndPoint, FILTER_BY } from 'src/model/util';

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
  public iReportsResp: I_ReportsResp;
  public pageheading = '';
  public currentMaxPage = this.util.maxPageCountReport;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FILTERBY = FILTER_BY;
  constructor(
    private activeRoute: ActivatedRoute,
    private httpServc: HttpService,
    private util: UtilService,
    private snackBar: SnackbarService,
    private alertCtrl: AlertController
  ) {
    this.currentMaxPage = this.util.maxPageCountReport;
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
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
      this.iReportsResp = this.util.iReportsResp;
    });
  }

  handlePageEvent = (ev: PageEvent) => {
    this.fetchData(ev.pageIndex);
  };

  fetchData = (pageIndex?: number) => {
    this.fetchFilterBill({
      startDate: this.startDate,
      endDate: this.endDate,
      selectedReport: this.selectedReport,
      filterDateBy: this.filterDateBy,
      paged: true,
      page: pageIndex ? pageIndex + 1 : 1,
      count: this.currentMaxPage,
    });
  };

  private fetchFilterBill = (report: I_ReportFilter) => {
    this.util.isLoading = true;
    this.httpServc
      .post(ApiEndPoint.REPORT_BILLWISE, { ...report })
      .then((appResp: AppResponse<I_ReportsResp>) => {
        console.log(appResp.responseObject);
        debugger;
        this.iReportsResp = { ...appResp.responseObject };

        this.util.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.util.isLoading = false;
      });
  };
}
