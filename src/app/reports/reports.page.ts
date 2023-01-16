import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AppResponse } from 'src/model/AppResponse';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { I_Items } from 'src/model/items';
import { I_ReportFilter } from 'src/model/ReportFilter';
import { I_ReportsResp } from 'src/model/ReportFilterResp';
import { ApiEndPoint, FILTER_BY, StoreName, UtilClass } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';
import { CartService } from '../providers/cart-service.service';
import { HttpService } from '../providers/http.service';
import { SnackbarService } from '../providers/snackbar.service';
import { UtilService } from '../providers/utilservice.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.page.html',
  styleUrls: ['./reports.page.scss'],
})
export class ReportsPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FILTERBY = FILTER_BY;

  public filterDateBy = FILTER_BY.DATE;

  public startDate: Date = null;
  public endDate: Date = null;

  public startM = '';
  public endM = '';

  public startY = '';
  public endY = '';

  public selectedReport = '-1';
  public allItems: I_Items[] = [];

  public maxDate: Date = null;

  public iReportsResp: I_ReportsResp;
  constructor(
    public util: UtilService,
    private cartServc: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private storage: AppStorageService,
    private httpServc: HttpService,
    private snacBar: SnackbarService
  ) {}

  ngOnInit() {
    this.fetchItems();
    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          // this.util.isLoading = true;
          this.allItems = [...this.cartServc.mainItems];
          this.fetchItems();
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

  onNextScreen = () => {
    debugger;
    if (this.selectedReport && this.selectedReport.trim() === '-1') {
      const paramObj = {
        filterDateBy: this.filterDateBy,
        startDate:
          this.filterDateBy === this.FILTERBY.DATE
            ? this.startDate
            : this.filterDateBy === this.FILTERBY.MONTH
            ? this.startM
            : this.startY,
        endDate:
          this.filterDateBy === this.FILTERBY.DATE
            ? this.endDate
            : this.filterDateBy === this.FILTERBY.MONTH
            ? this.endM
            : this.endY,
        selectedReport: this.selectedReport,
      };
      // this.router.navigate(['report-tab'], {
      //       relativeTo: this.activeRoute,
      //       queryParams: { ...paramObj },
      // });
      this.fetchFilterBill(
        {
          startDate: paramObj.startDate,
          endDate: paramObj.endDate,
          selectedReport: paramObj.selectedReport,
          filterDateBy: paramObj.filterDateBy,
          paged: true,
          page: 1,
          count: this.util.maxPageCountReport,
        },
        () => {
          this.router.navigate(['report-tab'], {
            relativeTo: this.activeRoute,
            queryParams: { ...paramObj },
          });
        }
      );
    } else {
      this.router.navigate(['itemwise'], {
        relativeTo: this.activeRoute,
        queryParams: {
          filterDateBy: this.filterDateBy,
          startDate:
            this.filterDateBy === this.FILTERBY.DATE
              ? this.startDate
              : this.filterDateBy === this.FILTERBY.MONTH
              ? this.startM
              : this.startY,
          endDate:
            this.filterDateBy === this.FILTERBY.DATE
              ? this.endDate
              : this.filterDateBy === this.FILTERBY.MONTH
              ? this.endM
              : this.endY,
          selectedReport: this.selectedReport,
        },
      });
    }
  };

  onChangeItem = (value) => {};

  onChangeDate = (value) => {};

  onChangeFilterType = () => {
    this.startDate = null;
    this.endDate = null;

    this.startM = '';
    this.endM = '';

    this.startY = '';
    this.endY = '';
  };
  private fetchItems = () => {
    this.httpServc
      .get(ApiEndPoint.ITEM_LIST)
      .then((e: AppResponse<I_Items[]>) => {
        this.allItems = [...e.responseObject];
      })
      .catch((e) => {
        this.snacBar.openSnackBar('Item list not available this time');
      });
  };
  private fetchFilterBill = (report: I_ReportFilter, callback: Function) => {
    this.util.isLoading = true;
    this.httpServc
      .post(ApiEndPoint.REPORT_BILLWISE, { ...report })
      .then((appResp: AppResponse<I_ReportsResp>) => {

        this.util.iReportsResp = { ...appResp.responseObject };
        this.util.isLoading = false;
        if (callback) {
          callback();
        }
      })
      .catch((e) => {
        console.log(e);
        this.util.isLoading = false;
      });
  };

  shouldNextDisable = (): boolean => {
    let isDisable = true;
    let paramObj: { startDate: any; endDate: any } = {} as {
      startDate: any;
      endDate: any;
    };

    paramObj = {
      startDate:
        this.filterDateBy === this.FILTERBY.DATE
          ? this.startDate
          : this.filterDateBy === this.FILTERBY.MONTH
          ? this.startM
          : this.startY,
      endDate:
        this.filterDateBy === this.FILTERBY.DATE
          ? this.endDate
          : this.filterDateBy === this.FILTERBY.MONTH
          ? this.endM
          : this.endY,
    };

    isDisable =
      paramObj?.endDate === null ||
      paramObj?.startDate === null ||
      paramObj?.endDate === '' ||
      paramObj?.startDate === '';

    return isDisable;
  };
}
