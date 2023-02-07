import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { UpdateBillComponent } from './update-bill/update-bill.component';

@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.page.html',
  styleUrls: ['./all-bills.page.scss'],
})
export class AllBillsPage implements OnInit {
  dialogRef: MatDialogRef<UpdateBillComponent, any>;
  pageIndex: number = 0;
  today: Date;
  onBranchChanged() {
    this.fetchBills();
  }
  public currentMaxPage = 10;
  public currentDate: Date = null;
  public allBills: I_BillingReq[] = [];
  public allBillResponse: AppResponse<I_BillResp> = null;
  public maxDate;
  BILLING_READ: boolean;
  BILLING_DELETE: boolean;
  BILLING_UPDATE: boolean;
  constructor(
    public util: UtilService,
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private storage: AppStorageService,
    private alrtCtrl: AlertController,
    private alertSrvc: AlertService,
    private snackbar: SnackbarService,
    private httpServic: HttpService,
    private dialog: MatDialog
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
        if (
          event instanceof NavigationStart &&
          event.url.startsWith('/tab/allbills')
        ) {
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

  onClickItemBill = (billItem: I_BillingReq) => {
    this.router.navigate(['existingbill'], {
      relativeTo: this.activeRoute,
      queryParams: {
        data: JSON.stringify(this.convertBillRequestToBill(billItem)),
      },
    });
  };
  fetchBills = async (page?: number) => {
    this.today = new Date();
    this.fetchBillsfromServer(page || 1);
  };

  fetchBillsfromServer = async (page: number): Promise<I_BillingReq[]> => {
    this.allBills = [];
    if (this.BILLING_READ) {
      this.util.isLoading = true;
      const dt = this.convertDate(new Date(this.currentDate));
      const appResp: AppResponse<I_BillResp> = await this.httpServic.get(
        ApiEndPoint.BILL_LIST,
        `date=${dt}&paged=true&page=${page || 1}&count=${
          this.currentMaxPage
        }&branchCode=${this.util.branchCode}`
      );

      if (appResp.status == 1) {
        this.allBillResponse = { ...appResp };
        // const iBill: I_Bill[] = this.allBillResponse.responseObject.list.map(
        //   (b: I_BillingReq) => {
        //     let ibill: I_Bill = {} as I_Bill;
        //     ibill.billID = b.id;
        //     ibill.billnumber = +b.billNumber;
        //     ibill.customerContact = b.customer.mobileNumbers;
        //     ibill.customerName =
        //       b.customer.firstName +
        //       ' ' +
        //       b.customer.middleName +
        //       ' ' +
        //       b.customer.lastName;
        //     ibill.gender = b.customer.gender;
        //     ibill.discount = b.discount;
        //     ibill.paid = b.paid;
        //     ibill.due = b.Stotal + b.tax - b.paid;
        //     ibill.tax = b.tax;
        //     ibill.billDate = b.billingDate;
        //     ibill.itemPurchased = b.billingItemList.map((bi: I_BillingItem) => {
        //       const b: I_CartItem = {} as I_CartItem;
        //       b.id = bi.id;
        //       b.count = bi.itemCount;
        //       let i: I_Items = {} as I_Items;
        //       i.id = bi.itemID;
        //       i.itemName = bi.itemName;
        //       i.discount = bi.discount;
        //       i.isDiscountInPercentage = bi.isDiscountInPercentage;
        //       i.itemPrice = {} as {
        //         priceAmount: number;
        //         sellingAmount: number;
        //       };
        //       i.itemPrice.priceAmount = bi.priceAmount;
        //       i.itemPrice.sellingAmount = bi.sellingAmount;

        //       b.items = JSON.parse(JSON.stringify(i));
        //       return b;
        //     });
        //     return ibill;
        //   }
        // );
        this.allBills = [...this.allBillResponse.responseObject.list];
        this.util.isLoading = false;
        return this.allBills;
      }
    }
    this.snackbar.openSnackBar(
      `You don't have permission to read Billing List`
    );
    this.util.isLoading = false;
    return [] as I_BillingReq[];
  };

  onChangeDate = async () => {
    await this.fetchBills();
  };

  trackByFn = (inx, item: I_BillingReq) => item.id || '';

  onPayDue = (e, bill: I_BillingReq) => {
    e.stopPropagation();
    this.presentAlert(bill);
  };

  onDelete = (e, bill: I_BillingReq) => {
    e.stopPropagation();
    this.alertSrvc.presentAlert(
      this.alrtCtrl,
      `Confirm Delete of Bill: ${bill.billNumber}`,
      'Are you sure, you want to delete the bill? ',
      { ok: 'Yes', cancel: 'No' },
      async () => {
        // eslint-disable-next-line no-underscore-dangle
        this.alertSrvc.presentAlert(
          this.alrtCtrl,
          `Confirm Delete of Bill: ${bill.billNumber}`,
          'Once Delete it is not revertable. Check the bill number before you delete. Want to continue?',
          { ok: 'Yes', cancel: 'No' },
          async () => {
            // eslint-disable-next-line no-underscore-dangle
            this.deleteFromServer(bill);
          },
          () => {}
        );
      },
      () => {}
    );
  };

  deleteFromServer = async (bill: I_BillingReq) => {
    this.util.isLoading = true;
    this.httpServic
      .delete(ApiEndPoint.BILL_DELETE, bill.id)
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

  yesHandler = async (bill: I_BillingReq, dueInput: string) => {
    this.payDueServer(bill, dueInput);
  };
  payDueServer = (bill: I_BillingReq, dueInput: string) => {
    this.util.isLoading = true;
    this.httpServic
      .put(ApiEndPoint.BILL_UPDATE_PAYDUE, bill.id, {
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

  noHandler = () => {};

  async presentAlert(bill: I_BillingReq) {
    const alert = await this.alrtCtrl.create({
      header: 'Please enter amount',
      subHeader: `Due amount:  ${bill.Stotal - bill.paid}`,
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
          max: bill.Stotal - bill.paid,
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
  handlePageEvent = (ev: PageEvent) => {
    this.pageIndex = ev.pageIndex + 1;
    this.fetchBills(this.pageIndex);
  };

  openDialog = (e, bill: I_BillingReq): void => {
    e.stopPropagation();
    this.dialogRef = this.dialog.open(UpdateBillComponent, {
      width: '95%',
      height: '600px',
      maxWidth: '450px',
      maxHeight: '95%',
      data: { ...bill },
    });

    this.dialogRef.afterClosed().subscribe((newBilltoUpdate: I_BillingReq) => {
      if (!newBilltoUpdate) {
        return;
      }
      this.alertSrvc.presentAlert(
        this.alrtCtrl,
        'Confirmation',
        'Are you sure to add the items?',
        {
          ok: 'Yes',
          cancel: 'No',
        },
        () => {
          this.httpServic
            .put(
              ApiEndPoint.BILL_UPDATE_ITEMADD,
              newBilltoUpdate.id.toString(),
              newBilltoUpdate
            )
            .then((e) => {
              this.snackbar.openSnackBar('Bill updated');

              this.util.printBill(
                this.calculateTotal(newBilltoUpdate),
                this.alrtCtrl,
                this.alertSrvc
              );
              this.fetchBills(this.pageIndex);
            })
            .catch((e) => console.log(e));
        }
      );
    });
  };

  onCLoseAddDialog = () => {};
  private calculateTotal(record: I_BillingReq): I_BillingReq {
    record.Ptotal = 0;
    record.Stotal = 0;
    record.billingItemList.map((b) => {
      record.Ptotal += b.priceAmount * b.itemCount;
      record.Stotal +=
        (b.sellingAmount -
          (b.discount > 0
            ? b.isDiscountInPercentage
              ? (b.sellingAmount * b.discount) / 100
              : b.discount
            : 0)) *
        b.itemCount;
    });

    return record;
  }
  convertBillRequestToBill = (b: I_BillingReq): I_Bill => {
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
  };

  getDate = (dt): boolean => {

    return (
      (this.today.valueOf() - new Date(dt).valueOf()) / 1000 / 60 / 60 / 12 < 1
    );
  };
}
