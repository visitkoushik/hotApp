import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { I_TenantDetails } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';
import { UtilService } from '../providers/utilservice.service';

@Component({
  selector: 'app-configure',
  templateUrl: './configure.page.html',
  styleUrls: ['./configure.page.scss'],
})
export class ConfigurePage implements OnInit {
  public companyName = 'Default Company';
  public tan = '';
  public pan = '';
  public code = '';
  public tradeLicense = '';
  public username = '';
  public password = '';
  public confpassword = '';
  constructor(
    private util: UtilService,
    private router: Router,
    private store: AppStorageService
  ) {}

  ngOnInit() {
    this.tan = this.util.tenantDetail?.tan || '';
    this.pan = this.util.tenantDetail?.pan || '';
    this.code = this.util.tenantDetail?.code || '';
    this.companyName = this.util.tenantDetail?.name || this.companyName;
    this.tradeLicense = this.util.tenantDetail?.tradeLicense || '';
    this.username = this.util.tenantDetail?.username || '';
    this.password = this.util.tenantDetail?.password || '';
  }

  onSave = () => {
    const tenat = {
      tan: this.tan,
      name: this.companyName,
      code: this.code,
      pan: this.pan,
      tradeLicense: this.tradeLicense,
      username: this.username,
      password: this.password,
    } as I_TenantDetails;

    this.util.tenantDetail = { ...tenat };
    this.store
      .setStorage('tenant', { ...this.util.tenantDetail })
      .then((e) => {

          this.router.navigateByUrl('tab');

      })
      .catch((e) => {});
  };

  isValid = (): boolean =>
    (this.pan.trim().length > 0 || this.tan.trim().length > 0) &&
    this.username.trim().length >= 5 &&
    this.password.trim().length >= 8 &&
    this.password === this.confpassword;
}
