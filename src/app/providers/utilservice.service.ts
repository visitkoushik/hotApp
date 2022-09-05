import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilService {
  public gvtTax = 0;
  public storeBilling: any;
  public isLoading=false;
  constructor() {}
}
