import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';
import { ShortDatePipe } from 'src/app/pipe/short-date.pipe';
import { CartService } from 'src/app/providers/cart-service.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Bill } from 'src/model/bill';
import { ClassBill } from 'src/model/billClass';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { ClassReportCart, I_ReportCart } from 'src/model/ItemReport';
import { I_Items } from 'src/model/items';
import { I_ReportFilter } from 'src/model/ReportFilter';
import { I_ReportsResp } from 'src/model/ReportFilterResp';
import { ApiEndPoint, FILTER_BY, I_ProductReport } from 'src/model/util';
// eslint-disable-next-line @typescript-eslint/naming-convention
interface I_ItemReport {
  orderNumber: number;
  date: string;
  itemCount: number;
  sellingAmount: number;
  priceAmount: number;
  total: number;
  itemName: string;
}

@Component({
  selector: 'app-itemwise',
  templateUrl: './itemwise.page.html',
  styleUrls: ['./itemwise.page.scss'],
})
export class ItemwisePage implements OnInit {
  public startDate: string = null;
  public endDate: string = null;
  public selectedReport = '-1';
  public filterDateBy: FILTER_BY;

  public pageheading: string | Date = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FILTERBY = FILTER_BY;
  public itemName = '';
  // public allItems: I_Items[] = [];
  public reportResultBalance: I_ItemReport[] = null;
  public totalProfit = 0;
  public displayedColumns = [
    'order',
    'date',
    'itemCount',
    'sellingAmount',
    'total',
  ];

  public start: Date = null;
  public end: Date = null;
  public currentMaxPage = this.util.maxPageCountReport;
  public transform = new ConvertToFullDate().transform;
  iReportsResp: {
    billList: I_ItemReport[];
    totalPage: number;
    currentPage: number;
  };
  constructor(
    private cartServc: CartService,
    private activeRoute: ActivatedRoute,
    private util: UtilService,
    private httpService: HttpService,
    private snackBar: SnackbarService,
    private router: Router
  ) {
    this.currentMaxPage = this.util.maxPageCountReport;
  }

  ngOnInit(): void {
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
      this.fetchData();
    });
    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          // this.fetchData();
        }

        if (event instanceof NavigationEnd) {
          // Hide loading indicator
        }

        if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
        }
      }
    );
  }
  fetchData = (pageIndex?: number) => {
    debugger;
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
  handlePageEvent = (ev: PageEvent) => {
    this.fetchData(ev.pageIndex);
  };
  private fetchFilterBill = (report: any) => {
    this.util.isLoading = true;
    this.httpService
      .post(ApiEndPoint.REPORT_ITEMWISE, { ...report })
      .then((appResp: AppResponse<any>) => {
        console.log(appResp.responseObject);
        debugger;

        this.iReportsResp = { ...appResp.responseObject };
        this.totalProfit=0;
        this.reportResultBalance = this.iReportsResp.billList.map(
          (e: I_ItemReport, inx) => {
            this.itemName = e.itemName;
            this.totalProfit += e.total;
            return { ...e, order: inx + 1 };
          }
        );

        this.util.isLoading = false;
      })
      .catch((e) => {
        console.log(e);
        this.util.isLoading = false;
      });
  };
}
