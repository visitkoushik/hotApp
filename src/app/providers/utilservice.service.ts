import { Injectable } from '@angular/core';
import { I_TenantDetails } from 'src/model/util';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public gvtTax = 0;
  public storeBilling: any;
  public isLoading=false;
  public tenantDetail: I_TenantDetails;
  constructor() {}
}
