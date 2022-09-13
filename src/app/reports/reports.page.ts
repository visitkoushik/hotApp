import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { I_Items } from 'src/model/items';
import { FILTER_BY, StoreName, UtilClass } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';
import { CartService } from '../providers/cart-service.service';
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

  constructor(
    private cartServc: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private util: UtilService,
    private storage: AppStorageService
  ) {
    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          this.util.isLoading = true;
          this.storage
            .getStorage(StoreName.BILL)
            .then((e) => {
              this.util.isLoading = !true;
              [...this.cartServc.allBiills] = [...e];

            })
            .catch((e) => {
              this.util.isLoading = !true;
            });
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
    this.allItems = [...this.cartServc.mainItems];
  }

  onNextScreen = () => {
    this.router.navigate(['report-tab'], {
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
}
