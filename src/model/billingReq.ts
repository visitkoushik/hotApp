import { GENDER } from './util';

export interface I_BillingReq {
  billingItemList: I_BillingItem[];
  billNumber: string;
  discount: number;
  isDiscountInPercentage: boolean;
  Ptotal: number;
  Stotal: number;
  customer: I_Customer;
  itemCount: number;
  paid: number;
  tax: number;
  id?: string;
  billingDate?: Date;
}

export interface I_BillResp {
  list: I_BillingReq[];
  profit: number;
}

export interface I_BillingItem {
  itemID: string;
  itemName: string;
  description: string;
  priceAmount: number;
  sellingAmount: number;
  itemCount: number;
  discount: number;
  isDiscountInPercentage: boolean;
  id?: string;
}

export interface I_Customer {
  firstName: string;
  lastName: string;
  middleName: string;
  mobileNumbers: string;
  gender: GENDER;
  id?: string;
}
