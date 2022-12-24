import { Injectable } from '@angular/core';
import { I_MetaData } from 'src/model/metadata';
import { I_TenantDetails } from 'src/model/util';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public gvtTax = 0;
  public storeBilling: any;
  public isLoading = false;
  public tenantDetail: I_TenantDetails;
  public metaData: I_MetaData;
  constructor() {}
}
