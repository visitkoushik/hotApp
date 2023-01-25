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
  public branchCode: string;
  public isLoggedIn = false;
  get redirectUrl(): string {
    return this.url;
  }
  set redirectUrl(url: string) {
    this.url = url;
  }

  constructor(private storage: AppStorageService,private router:Router) {}

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
    return new Promise((res, rej) => {
      if (this.printer === null) {
        rej('Printer not set yet. Please goto App Setting and set the printer');
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
}
