import { Injectable } from '@angular/core';
import { I_MetaData } from 'src/model/metadata';
import { I_ReportsResp } from 'src/model/ReportFilterResp';
import { I_UserLogin } from 'src/model/userLogin';
import { I_TenantDetails } from 'src/model/util';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public gvtTax = 0;
  public maxPageCount=1;
  public maxPageCountReport=1;
  public storeBilling: any;
  public isLoading = false;
  public tenantDetail: I_TenantDetails;
  public metaData: I_MetaData;
  public userLogin: I_UserLogin;
  public iReportsResp: I_ReportsResp;
  constructor() {}

}
