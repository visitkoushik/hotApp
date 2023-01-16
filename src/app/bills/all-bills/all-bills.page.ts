import { Component, OnInit } from '@angular/core';
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
import { AppResponse } from 'src/model/AppResponse';
import { I_Bill } from 'src/model/bill';
import { ClassBill } from 'src/model/billClass';
import { I_BillingItem, I_BillingReq, I_BillResp } from 'src/model/BillingReq';
import { I_CartItem } from 'src/model/cartItem';
import { I_Items } from 'src/model/items';
import { ApiEndPoint, StoreName } from 'src/model/util';
import { AppStorageService } from '../../app-storage/app-storage.service';
import { CartService } from '../../providers/cart-service.service';
import { UtilService } from '../../providers/utilservice.service';

@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.page.html',
  styleUrls: ['./all-bills.page.scss'],
})
export class AllBillsPage implements OnInit {
  public currentMaxPage = 10;
  public currentDate: Date = null;
  public allBills: I_Bill[] = [];
  public allBillResponse: AppResponse<I_BillResp> = null;
  public maxDate;
  BILLING_READ: boolean;
  BILLING_DELETE: boolean;
  BILLING_UPDATE: boolean;
  constructor(
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private storage: AppStorageService,
    private util: UtilService,
    private alrtCtrl: AlertController,
    private alertSrvc: AlertService,
    private snackbar: SnackbarService,
    private httpServic: HttpService
  ) {
    this.currentMaxPage = this.util.maxPageCount;
    this.currentDate = new Date();
    this.BILLING_READ =
      this.util.metaData.accessRight.findIndex((e) => e === 'BILLING_READ') >
      -1;
    this.BILLING_DELETE =
      this.util.metaData.accessRight.findIndex((e) => e === 'BILLING_DELETE') >
      -1;

    this.BILLING_UPDATE =
      this.util.metaData.accessRight.findIndex((e) => e === 'BILLING_UPDATE') >
      -1;
    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          // this.util.isLoading = true;
          this.currentMaxPage = this.util.maxPageCount;
          this.setMaxDate();
          this.fetchBills();
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

    this.setMaxDate();
    this.fetchBills();
  }

  onClickItemBill = (billItem: I_Bill) => {
    this.router.navigate(['existingbill'], {
      relativeTo: this.activeRoute,
      queryParams: { data: JSON.stringify(billItem) },
    });
  };
  fetchBills = async (page?: number) => {
    this.fetchBillsfromServer(page || 1);
  };
  fetchBillsfromStorage = () => {
    this.storage
      .getStorage(StoreName.BILL)
      .then(async (e) => {
        this.util.isLoading = !true;
        [...this.cartService.allBiills] = [...e];

        this.allBills = await this.updateBills();
      })
      .catch((e) => {
        this.util.isLoading = !true;
      });
  };

  fetchBillsfromServer = async (page: number): Promise<I_Bill[]> => {
    this.allBills = [];
    if (this.BILLING_READ) {
      this.util.isLoading=true;
      const dt = this.convertDate(new Date(this.currentDate));
      const appResp: AppResponse<I_BillResp> = await this.httpServic.get(
        ApiEndPoint.BILL_LIST,
        `date=${dt}&paged=true&page=${page || 1}&count=${this.currentMaxPage}`
      );

      if (appResp.status == 1) {
        this.allBillResponse = { ...appResp };
        const iBill: I_Bill[] = this.allBillResponse.responseObject.list.map(
          (b: I_BillingReq) => {
            let ibill: I_Bill = {} as I_Bill;
            ibill.billID = b.id;
            ibill.billnumber = +b.billNumber;
            ibill.customerContact = b.customer.mobileNumbers;
            ibill.customerName =
              b.customer.firstName +
              ' ' +
              b.customer.middleName +
              ' ' +
              b.customer.lastName;
            ibill.gender = b.customer.gender;
            ibill.discount = b.discount;
            ibill.paid = b.paid;
            ibill.due = b.Stotal + b.tax - b.paid;
            ibill.tax = b.tax;
            ibill.billDate = b.billingDate;
            ibill.itemPurchased = b.billingItemList.map((bi: I_BillingItem) => {
              const b: I_CartItem = {} as I_CartItem;
              b.id = bi.id;
              b.count = bi.itemCount;
              let i: I_Items = {} as I_Items;
              i.id = bi.itemID;
              i.itemName = bi.itemName;
              i.discount = bi.discount;
              i.isDiscountInPercentage = bi.isDiscountInPercentage;
              i.itemPrice = {} as {
                priceAmount: number;
                sellingAmount: number;
              };
              i.itemPrice.priceAmount = bi.priceAmount;
              i.itemPrice.sellingAmount = bi.sellingAmount;

              b.items = JSON.parse(JSON.stringify(i));
              return b;
            });
            return ibill;
          }
        );
        this.allBills = [...iBill];
        this.util.isLoading=false;
        return iBill;
      }
    }
    this.snackbar.openSnackBar(
      `You don't have permission to read Billing List`
    );
    this.util.isLoading=false;
    return [] as I_Bill[];
  };

  updateBills = (): Promise<I_Bill[]> =>
    new Promise((res) => {
      const allBills = [...this.cartService.allBiills]?.filter(
        (itm) =>
          itm.status &&
          new Date(itm.billDate).toLocaleDateString() ===
            new Date(this.currentDate).toLocaleDateString()
      );
      res(allBills || []);
    });

  onChangeDate = async () => {
    // this.allBills = await this.updateBills();
    await this.fetchBills();
  };

  trackByFn = (inx, item: I_Bill) => item.billID;

  onPayDue = (e, bill: I_Bill) => {
    e.stopPropagation();
    this.presentAlert(bill);
  };

  onDelete = (e, bill: I_Bill) => {
    e.stopPropagation();
    this.alertSrvc.presentAlert(
      this.alrtCtrl,
      'Confirm Delete',
      'Are you sure, you want to delete the bill? ',
      { ok: 'Yes', cancel: 'No' },
      async () => {
        // eslint-disable-next-line no-underscore-dangle
        this.deleteFromServer(bill);
      },
      () => {}
    );
  };

  deleteFromStorage = async (bill: I_Bill) => {
    this.cartService.allBiills = this.cartService.allBiills.map((b: I_Bill) =>
      b.billID === bill.billID ? { ...b, status: false } : b
    );

    await this.storage.setStorage(StoreName.BILL, [
      ...this.cartService.allBiills,
    ]);
    this.allBills = await this.updateBills();
  };
  deleteFromServer = async (bill: I_Bill) => {
    this.util.isLoading = true;
    this.httpServic
      .delete(ApiEndPoint.BILL_DELETE, bill.billID)
      .then((e: AppResponse<string>) => {
        this.snackbar.openSnackBar(e.responseObject);
        this.fetchBills()
          .then((e) => {
            this.util.isLoading = false;
          })
          .catch((e) => {
            this.util.isLoading = false;
          });
      })
      .catch((e: any) => {
        this.snackbar.openSnackBar(e.error);
        this.util.isLoading = false;
      });
  };

  setMaxDate = () => {
    this.maxDate = new Date();
  };

  yesHandler = async (bill: I_Bill, dueInput: string) => {
    this.payDueServer(bill, dueInput);
  };
  payDueServer = (bill: I_Bill, dueInput: string) => {
    this.util.isLoading = true;
    this.httpServic
      .put(ApiEndPoint.BILL_UPDATE_PAYDUE, bill.billID, {
        paid: dueInput,
      })
      .then((e: AppResponse<string>) => {
        this.snackbar.openSnackBar(e.responseObject);
        this.fetchBills()
          .then((e) => {
            this.util.isLoading = false;
          })
          .catch((e) => {
            this.util.isLoading = false;
          });
      })
      .catch((e: AppResponse<string>) => {
        this.snackbar.openSnackBar(e.error);
        this.util.isLoading = false;
      });
  };

  payDueStorage = async (bill: I_Bill, dueInput: string) => {
    if (!dueInput || +dueInput <= 0 || bill.due < +dueInput) {
      if (!dueInput || +dueInput >= bill.due) {
        this.snackbar.openSnackBar(
          'Input amount cannot be greater than due amount'
        );
      } else {
        this.snackbar.openSnackBar('Enter amount atleast 1 Rs.');
      }

      return false;
    }
    this.allBills = this.allBills.map((e) =>
      e.billID === bill.billID
        ? { ...e, due: e.total - e.paid - +dueInput, paid: e.paid + +dueInput }
        : e
    );

    this.cartService.allBiills = [...this.allBills];
    await this.storage
      .setStorage(StoreName.BILL, [...this.cartService.allBiills])
      .catch((err) => this.snackbar.openSnackBar('Error update data'));
  };

  noHandler = () => {};

  async presentAlert(bill: I_Bill) {
    const alert = await this.alrtCtrl.create({
      header: 'Please enter amount',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

          handler: () => this.noHandler(),
        },
        {
          text: 'OK',

          handler: (data) => this.yesHandler(bill, data.dueInput),
        },
      ],
      inputs: [
        {
          name: 'dueInput',
          type: 'number',
          placeholder: 'Due amount',
          min: 1,
          max: bill.due,
        },
      ],
    });

    await alert.present();
  }

  convertDate = (dt: Date): string => {
    // 2023-01-04T

    return `${dt.getFullYear()}-${(dt.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${dt
      .getDate()
      .toString()
      .padStart(2, '0')}T00:00:00.000Z`;
  };
  handlePageEvent = (ev:PageEvent) => {

    this.fetchBills(ev.pageIndex+1);
  };
}
