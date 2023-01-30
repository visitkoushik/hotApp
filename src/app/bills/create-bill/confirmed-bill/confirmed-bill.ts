import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { AlertService } from 'src/app/providers/alert.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Bill } from 'src/model/bill';
import { ClassBill, I_Print } from 'src/model/billClass';
import {
  I_BillingItem,
  I_BillingReq,
  I_BillResp,
  I_Customer,
} from 'src/model/BillingReq';
import { I_CartItem } from 'src/model/cartItem';
import { ApiEndPoint, StoreName } from 'src/model/util';
@Component({
  templateUrl: './confirmed-bill.html',
  styleUrls: ['./confiremd-bill.scss'],
})
export class ConfiremdBillPage implements OnInit {
  public currentBillPrintStr: string = null;
  public currentBillPrint: I_Print = null;
  public currentBill: I_Bill;
  BILLING_ADD: boolean;
  BILLING_READ: boolean;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cartService: CartService,
    private storeage: AppStorageService,
    private util: UtilService,
    private snack: SnackbarService,
    private alertServc: AlertService,
    private altrCtrl: AlertController,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.BILLING_ADD =
      this.util.metaData.accessRight.findIndex((e) => e === 'BILLING_ADD') > -1;

    this.BILLING_READ =
      this.util.metaData.accessRight.findIndex((e) => e === 'BILLING_READ') >
      -1;
    this.activeRoute.queryParams.subscribe((p) => {
      this.currentBillPrintStr = p.data;
      this.currentBillPrint = JSON.parse(p.data);
      this.currentBill = this.cartService.createBillPageRef.currentBiill;
    });
  }

  onDone = () => {
    this.alertServc.presentAlert(
      this.altrCtrl,
      'Confirm',
      'Are you sure, you want to crate the bill?',
      { ok: 'Yes', cancel: 'No' },
      () => {
        // eslint-disable-next-line no-underscore-dangle
        this.uploadBill();
        // this.done();
      },
      () => {}
    );
  };

  uploadBill = () => {
    this.util.isLoading = true;
    const billReq: I_BillingReq = this.createBill();
    if (this.BILLING_ADD) {
      this.httpService
        .post(ApiEndPoint.BILL_ADD, billReq)
        .then((e: AppResponse<I_BillingReq>) => {
          this.snack.openSnackBar('Bill is created');
          this.cartService.setDefaultBill();
          this.router.navigateByUrl('/tab/createbill');
          this.util.isLoading = false;
          const billFinal: I_BillingReq = e.responseObject;
          this.util.printBill({
            ...billFinal,
            customer: { ...billReq.customer },
          });
        })
        .catch((e) => {
          this.snack.openSnackBar('Something went wrong');
          this.util.isLoading = false;
        });
    } else {
      this.snack.openSnackBar('Operation not permitted');
    }
  };

  createBill = (): I_BillingReq => {
    let billReq: I_BillingReq = {} as I_BillingReq;
    billReq.discount = this.currentBill.discount;
    billReq.customer = this.getCustomerInfo();
    billReq.paid = this.currentBill.paid;
    billReq.tax = this.currentBill.tax;
    billReq.branchCode=this.util.branchCode;
    billReq.billingItemList = this.currentBill.itemPurchased.map(
      (cart: I_CartItem) => {
        const billingItem: I_BillingItem = {} as I_BillingItem;
        billingItem.itemCount = cart.count;
        billingItem.itemID = cart.items.id;
        billingItem.itemName = cart.items.itemName;
        billingItem.priceAmount = cart.items.itemPrice.priceAmount;
        billingItem.sellingAmount = cart.items.itemPrice.sellingAmount;
        billingItem.discount = cart.items.discount;
        billingItem.isDiscountInPercentage = cart.items.isDiscountInPercentage;

        return billingItem;
      }
    );
    billReq.billNumber = this.currentBill.billnumber + '';
    return billReq;
  };

  getCustomerInfo = (): I_Customer => {
    const castomerInfo: I_Customer = {} as I_Customer;
    const cName = this.currentBill.customerName.split(' ');
    castomerInfo.firstName = cName[0];
    castomerInfo.lastName = cName.length > 1 ? cName[cName.length - 1] : '';
    castomerInfo.middleName =
      cName.length > 2 ? cName.slice(1, cName.length - 1).join(' ') : '';
    castomerInfo.gender = this.currentBill.gender;
    castomerInfo.mobileNumbers = this.currentBill.customerContact;
    return castomerInfo;
  };
  done = async () => {
    this.util.isLoading = true;
    const allbills = [...this.cartService.allBiills];
    allbills.push({
      ...this.cartService.createBillPageRef.currentBiill,
      status: true,
    });

    const dt = new Date();
    const key = `${dt.getDay()}-${dt.getMonth()}-${dt.getFullYear()}`;
    await this.storeage.setStorage(StoreName.ORDER, {
      key,
      order: this.cartService.globalOrderNumber,
    });

    this.storeage
      .setStorage(StoreName.BILL, allbills)
      .then((e) => {
        this.snack.openSnackBar('Bill created');
        this.cartService.allBiills.push({
          ...this.cartService.createBillPageRef.currentBiill,
          status: true,
        });
        this.cartService.allBiills = [...allbills];
        this.cartService.setDefaultBill();
        this.router.navigateByUrl('/tab/createbill');
        this.util.isLoading = false;
      })
      .catch((ex) => {
        this.util.isLoading = false;
      });
  };

  onChangePaid = () => {
    this.cartService.createBillPageRef.currentBiill.paid =
      this.currentBill.paid;
    this.cartService.createBillPageRef.currentBiill.due =
      this.currentBill.total - this.currentBill.paid;
  };


}
