import { Component, OnInit } from '@angular/core';
import { StoreName } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';
import { ThemeService } from '../providers/theme.service';
import { UtilService } from '../providers/utilservice.service';
import {
  Printer,
  ThermalPrinterPlugin,
} from 'thermal-printer-cordova-plugin/src';

declare let ThermalPrinter: ThermalPrinterPlugin;

import { BleClient } from '@capacitor-community/bluetooth-le';
import { AlertController } from '@ionic/angular';
import { AlertService } from '../providers/alert.service';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.page.html',
  styleUrls: ['./appsetting.page.scss'],
})
export class AppsettingPage implements OnInit {
  public themeColor = [
    { name: 'Default', class: 'default' },
    { name: 'Dark', class: 'dark-theme' },
    { name: 'Grapes', class: 'green' },
    { name: 'Orange', class: 'orange' },
    { name: 'Strawberry', class: 'crimson' },
    { name: 'Blueberry', class: 'purple' },
  ];

  public pageSettingBill = [
    { name: '1', value: 1 },
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '20', value: 20 },
    { name: '30', value: 30 },
  ];
  public pageSettingReport = [
    { name: '1', value: 1 },
    { name: '5', value: 5 },
    { name: '10', value: 10 },
    { name: '20', value: 20 },
    { name: '30', value: 30 },
  ];

  public selectTheme;
  public selectPageSettingBill: number;
  public selectPageSettingReport: number;
  public allPrinter: Printer[] = [];
  public selectedPrinter: Printer = null;

  constructor(
    private theme: ThemeService,
    private store: AppStorageService,
    private util: UtilService,
    private alert: AlertService,
    private alertCtrl: AlertController
  ) {
    this.dynamicTheme();
    this.selectPageSettingBill = this.util.maxPageCount;
    this.selectPageSettingReport = this.util.maxPageCountReport;
    this.selectedPrinter = this.util.printer as unknown as Printer;
  }
  async ngOnInit(): Promise<void> {
    await BleClient.initialize({ androidNeverForLocation: true });
  }
  dynamicTheme = () => {
    this.selectTheme = this.theme.selectTheme || this.themeColor[0].class;
    this.theme.activeTheme(this.selectTheme);
  };
  onThemeChange = async () => {
    await this.store
      .setStorage(StoreName.THEME, this.selectTheme)

      .catch((er) => {});
    this.theme.selectTheme = this.selectTheme;
    this.dynamicTheme();
  };

  onBillChange = async () => {
    await this.store
      .setStorage(StoreName.PAGEBILL, this.selectPageSettingBill)

      .catch((er) => {});
    this.util.maxPageCount = this.selectPageSettingBill;
  };
  onReportChange = async () => {
    await this.store
      .setStorage(StoreName.PAGEREPORT, this.selectPageSettingReport)

      .catch((er) => {});
    this.util.maxPageCountReport = this.selectPageSettingReport;
  };

  onClickPrinterSetup = () => {
    // this.setUpBleClient();
    this.fetchPrinter();
  };

  fetchPrinter = () => {
    const printerType: 'bluetooth' | 'usb' | 'tcp' = 'bluetooth';

    ThermalPrinter.listPrinters(
      { type: printerType },
      (printers: Printer[]) => {
        printers = printers.filter((p) => p.majorDeviceClass === 1536);
        if (printers.length > 0) {
          this.allPrinter = printers;
        } else {
          this.alert.presentAlert(
            this.alertCtrl,
            'Print Error',
            'No Printer Found'
          );
        }
      },
      function (error) {
        console.error('Ups, we cant list the printers!', error);
      }
    );
  };

  connectToPrinter = (printerToUse: Printer) => {
    this.util.print(
      `[C]<u><font size='small'>If you able to see me the your printer has configured</font></u>`
    );
  };

  onDeviceChange = async () => {
    this.util.printer = this.selectedPrinter;

    await this.store.setStorage(StoreName.PRINTER, this.selectedPrinter);

    this.connectToPrinter(this.selectedPrinter);
  };
}
