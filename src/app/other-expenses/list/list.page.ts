import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu';
import { PageEvent } from '@angular/material/paginator';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Transaction } from 'src/model/Transaction';
import { ApiEndPoint } from 'src/model/util';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
  public currentDate: Date;
  maxDate: Date;
  transactionList: I_Transaction[] = [];
  public currentMaxPage = 10;

  pageIndex: number = 0;
  totalDr = 0;
  totalCr = 0;
  public displayedColumns = ['perticulars', 'amountCr', 'amountDr'];

  constructor(
    public util: UtilService,
    private httpSrvc: HttpService,
    private snacBar: SnackbarService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private alrtCtrl: AlertController,
    private alrtSrvc: AlertService
  ) {
    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (
          event instanceof NavigationStart &&
          event.url.startsWith('/other-expenses/list')
        ) {
          // this.util.isLoading = true;
          this.currentMaxPage = this.util.maxPageCount;
          this.setMaxDate();
          this.fetchTransaction();
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

  ngOnInit() {
    this.currentMaxPage = this.util.maxPageCountReport;
    this.currentDate = new Date();
    this.setMaxDate();
    this.fetchTransaction();
  }

  onChangeDate() {
    this.fetchTransaction();
  }
  onBranchChanged() {
    this.fetchTransaction();
  }

  setMaxDate = () => {
    this.maxDate = new Date();
  };

  fetchTransaction = (page: number = 1) => {
    const dt = this.convertDate(new Date(this.currentDate));
    this.util.isLoading = true;
    this.httpSrvc
      .get(
        ApiEndPoint.TRANSACTION_READ,
        `date=${dt}&paged=true&page=${page || 1}&count=${
          this.currentMaxPage
        }&branchCode=${this.util.branchCode}`
      )
      .then(
        (
          e: AppResponse<{
            list: I_Transaction[];
            totalCr: number;
            totalDr: number;
          }>
        ) => {
          this.util.isLoading = false;
          this.transactionList = [...e.responseObject.list];
          this.totalCr = e.responseObject.totalCr;
          this.totalDr = e.responseObject.totalDr;
        }
      )
      .catch((e) => {
        this.util.isLoading = false;
        this.snacBar.openSnackBar(e.error);
      });
  };

  convertDate = (dt: Date): string => {
    // 2023-01-04T

    return `${dt.getFullYear()}-${(dt.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dt
      .getDate()
      .toString()
      .padStart(2, '0')}T00:00:00.000Z`;
  };
  handlePageEvent = (ev: PageEvent) => {
    this.pageIndex = ev.pageIndex + 1;
    this.fetchTransaction(this.pageIndex);
  };

  onTapRowUpdate = (e) => {
    // this.trigger.openMenu();
    console.log('READY to Update', e);
    this.router.navigate(['/other-expenses/update'], {
      relativeTo: this.activatedRoute,
      queryParams: { ...e },
    });
  };
  deleteItem = (trns: I_Transaction) => {
    this.util.isLoading=true;
    this.httpSrvc.delete(ApiEndPoint.TRANSACTION_DELETE,trns.id)
    .then(e=>this.snacBar.openSnackBar('Transaction deleted'))
    .catch(e=>this.snacBar.openSnackBar('Something Went wrong'))

  };
  onTapRowDelete = (e) => {
    this.alrtSrvc.presentAlert(
      this.alrtCtrl,
      'Delete Transaction',
      'Are you sure to delete the transaction?',
      { ok: 'Yes', cancel: 'No' },
      () => {
        this.alrtSrvc.presentAlert(
          this.alrtCtrl,
          'Delete Transaction',
          'You can not revert this Operation once you delete. Still want to continue',
          { ok: 'Yes', cancel: 'No' },
          () => {
            this.deleteItem(e);
          }
        );
      }
    );
    console.log('READY to Delete', e);
  };
}
