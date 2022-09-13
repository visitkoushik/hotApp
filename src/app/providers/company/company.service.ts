import { Injectable } from '@angular/core';
import { I_TenantDetails } from 'src/model/util';
import { UtilService } from '../utilservice.service';

@Injectable({
  providedIn: 'root',
})
export class CompanyService {
  public redirectUrl = '';
  constructor() {}
  public saveCompany = (
    util: UtilService,
    tenant:  I_TenantDetails
  ) => {

    util.tenantDetail = { ...tenant };
  };
}
