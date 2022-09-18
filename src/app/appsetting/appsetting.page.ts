import { Component, OnInit } from '@angular/core';
import { StoreName } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';
import { ThemeService } from '../providers/theme.service';

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

  public selectTheme = this.themeColor[0].class;

  constructor(private theme: ThemeService, private store: AppStorageService) {
    this.dynamicTheme();
  }
  dynamicTheme = () => {
    this.theme.activeTheme(this.theme.selectTheme);
  };
  onThemeChange = async () => {
    await this.store
      .setStorage(StoreName.THEME, this.selectTheme)

      .catch((er) => {});
    this.theme.selectTheme = this.selectTheme;
    this.dynamicTheme();
  };
}
