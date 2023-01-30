import { Injectable } from '@angular/core';
import { I_MetaData } from 'src/model/metadata';
import { I_ReportsResp } from 'src/model/ReportFilterResp';
import { I_UserLogin } from 'src/model/userLogin';
import { I_TenantDetails, StoreName } from 'src/model/util';
import { Printer, PrinterToUse } from 'thermal-printer-cordova-plugin/src';
import { AuthService } from './auth/auth.service';
import { ThermalPrinterPlugin } from 'thermal-printer-cordova-plugin/src';
import { I_Branch } from 'src/model/branch';
import { I_Profile } from 'src/model/Profile';
import { AppStorageService } from '../app-storage/app-storage.service';
import { Router } from '@angular/router';
import { I_BillingReq, I_BillingItem } from 'src/model/BillingReq';

declare let ThermalPrinter: ThermalPrinterPlugin;

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  private url = '';
  public gvtTax = 0;
  public maxPageCount: number;
  public maxPageCountReport: number;
  public printer: Printer;
  public storeBilling: any;
  public isLoading = false;
  public tenantDetail: I_TenantDetails;
  public metaData: I_MetaData = null;
  public userLogin: I_UserLogin;
  public iReportsResp: I_ReportsResp;
  public allBranches: I_Branch[] = [];
  public branchCode: string = '0';
  public isLoggedIn = false;
  get redirectUrl(): string {
    return this.url;
  }
  set redirectUrl(url: string) {
    this.url = url;
  }

  constructor(private storage: AppStorageService, private router: Router) {}

  public onAppLogout = async () => {
    await this.storage.setStorage(StoreName.LOGIN, {
      userLogin: null,
      isLoggedIn: false,
    });
    this.userLogin = null;
    this.isLoggedIn = false;
    this.redirectUrl = '/';
    this.router.navigate(['/login']);
  };

  public print = (textToPrint: string): Promise<string> => {
    const thermalPrinter = ThermalPrinter;
    return new Promise((res, rej) => {
      if (this.printer === null || !thermalPrinter) {
        rej('Printer not set yet. Please goto App Setting and set the printer');
        return;
      }
      ThermalPrinter.printFormattedTextAndCut(
        {
          type: 'bluetooth',
          id: this.printer.address,
          text: textToPrint,
        },
        function () {
          res('Successfully printed!');
        },
        function (error) {
          rej('Printing error ' + error);
        }
      );
    });
  };

  printBill = (billing: I_BillingReq) => {
    let billText = `[C]<font size='big'><u>House Of Tea</u></font>\n\n\n`;

    billText += `[L]<b>ORDER NO: </b>${billing.billNumber}
[L]<b>Date: </b>${new Date(billing.billingDate).toLocaleDateString()}
[L]<b>Customer Name: </b>${billing.customer.firstName} ${
      billing.customer.lastName
    }`;

    billText += `\n\n[L]<b>Item(Qty) </b>[C] Dsc [R] Price`;
    billText += `\n--------------------------------\n`;
    for (let i = 0; i < billing.billingItemList.length; i++) {
      const bit: I_BillingItem = billing.billingItemList[i];
      billText += `[L]<b>${bit.itemName}(${bit.itemCount})</b>[C]${
        bit.discount != 0 ? bit.discount : ''
      }${bit.isDiscountInPercentage ? '%' : ''}[R]${
        bit.sellingAmount * bit.itemCount -
        (bit.isDiscountInPercentage
          ? (bit.sellingAmount * bit.itemCount * bit.discount) / 100
          : bit.discount)
      }\n`;
    }

    billText += `\n\n[C]<font >TOTAL</font>[R]<font size='normal'> ${billing.Stotal}</font>\n`;
    billText += `[C]<font >Discount</font>[R]<font size='normal'>-${billing.discount}</font>\n`;
    billText += `[C]<font >Tax(%)</font>[R]<font size='normal'>-${billing.tax}</font>\n`;
    billText += `[C]<font color='bg-black'>GRAND TOTAL</font>[R]<font size='normal'> ${
      billing.Stotal - billing.discount - billing.tax
    }</font>\n\n--------------------------------\n\n`;

    this.print(billText);
  };
}
