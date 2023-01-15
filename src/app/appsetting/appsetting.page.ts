import { Component } from '@angular/core';
import { StoreName } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';
import { ThemeService } from '../providers/theme.service';
import { UtilService } from '../providers/utilservice.service';

@Component({
  selector: 'app-appsetting',
  templateUrl: './appsetting.page.html',
  styleUrls: ['./appsetting.page.scss'],
})
export class AppsettingPage {
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
  public selectPageSettingBill:number;
  public selectPageSettingReport:number;

  constructor(
    private theme: ThemeService,
    private store: AppStorageService,
    private util: UtilService
  ) {
    this.dynamicTheme();
    this.selectPageSettingBill = this.util.maxPageCount;
    this.selectPageSettingReport = this.util.maxPageCountReport;
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
}
