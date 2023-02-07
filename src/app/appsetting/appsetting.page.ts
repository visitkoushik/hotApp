import { Component, OnInit } from '@angular/core';
import { StoreName } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';

import { UtilService } from '../providers/utilservice.service';

import { BleClient } from '@capacitor-community/bluetooth-le';
import { AlertController } from '@ionic/angular';
import { AlertService } from '../providers/alert.service';
import { Printer } from 'thermal-printer-cordova-plugin/src';
import { ThemeService } from '../providers/theme.service';
import { PrinterService } from '../providers/printer-service.service';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.page.html',
  styleUrls: ['./appsetting.page.scss'],
})
export class AppsettingPage implements OnInit {
  public thermalPrinter: any = null;
  public numberOfRecipt: number = 1;
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
    public util: UtilService,
    private alert: AlertService,
    private alertCtrl: AlertController,
    private printerService: PrinterService
  ) {
    this.dynamicTheme();
    this.selectPageSettingBill = this.util.maxPageCount;
    this.selectPageSettingReport = this.util.maxPageCountReport;
    this.selectedPrinter = this.util.printer as unknown as Printer;
    if (this.selectedPrinter) this.allPrinter = [this.selectedPrinter];

    this.thermalPrinter = this.printerService.checkPrinterDriver();

    this.numberOfRecipt =
      this.util.numberOfRecipt === undefined ? 1 : this.util.numberOfRecipt;
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
    this.util.isLoading = true;
    this.printerService
      .getListOfPrinter()
      .then((e: Printer[]) => {
        this.util.isLoading = false;
        this.allPrinter = e;
      })
      .catch((e) => {
        this.util.isLoading = false;
        this.alert.presentAlert(this.alertCtrl, 'Printer Error', e);
      });
  };

  connectToPrinter = () => {
    this.printerService.print(
      `[C]<u><font size='small'>${this.getTestText()}</font></u>`,
      this.util.printer
    );
  };

  getTestText = () => {
    const message = [
      'The first casualty when war comes is truth, -Hiram W Johnson. But who decide what truth is',
      'Keep Your Blood In, You`ll Need Every Drop.-Ghost',
      'Terrorism Is Good For Business. It`s Insurance.- Valeria',
      'When the power of love overcomes the love of power the world will know peace. -Jimi Hendrix',
      'Every new day begins with possibilities. It`s up to us to fill it with the things that move us toward progress and peace. -Ronald Reagan',
      'War does not determine who is right - only who is left. -Bertrand Russell',
      'Older men declare war. But it is the youth that must fight and die. -Herbert Hoover',
      'Before you embark on a journey of revenge, dig two graves. -Confucius',
      'The truth of the matter is that you always know the right thing to do. The hard part is doing it. -Robert H. Schuller',
      'Patriotism is your conviction that this country is superior to all others because you were born in it. -George Bernard Shaw',
      'A leader leads by example not by force. -Sun Tzu',
      'A citizen will cross the ocean to fight for democracy, but won`t cross the street to vote in a national election.',
      'Whether you like it or not, history is on our side. We will bury you!, -Nikita Khrushchev',
      'Principle is OK up to a certain point, but principle doesn`t do any good if you lose. -Dick Cheney',
      'I think the human race needs to think about killing. How much evil must we do to do good? -Robert McNamara',
      'If the enemy is in range, so are you.',
      'War is delightful to those who have not yet experienced it.',
      `Nearly all men can stand adversity, but if you want to test a man's character, give him power.`,
      `Never forget that your weapon was made by the lowest bidder.`,
      `Heroes may not be braver than anyone else. They're just brave five minutes longer.`,
    ];

    const index = this.generateRangom(0, message.length);

    return message[index] || message[0];
  };
  generateRangom = (low, up) => {
    const u = Math.max(low, up);
    const l = Math.min(low, up);
    const diff = u - l;
    const r = Math.floor(Math.random() * (diff + 1)); //'+1' because Math.random() returns 0..0.99, it does not include 'diff' value, so we do +1, so 'diff + 1' won't be included, but just 'diff' value will be.

    return l + r; //add the random number that was selected within distance between low and up to the lower limit.
  };
  onDeviceChange = async () => {
    this.util.printer = this.selectedPrinter;

    await this.store.setStorage(StoreName.PRINTER, this.selectedPrinter);
  };

  test = () => {
    this.connectToPrinter();
  };

  onChange = (ev) => {

    this.util.numberOfRecipt = this.numberOfRecipt;
    this.store.setStorage(StoreName.RECIPTNUMBER, this.numberOfRecipt);
  };
}
