import { I_BillingReq } from './BillingReq';

export interface I_ReportsResp {
  billList: BillingReport[];
  items: ItemReport[];
  totalPage: number;
  currentPage: number;
  profit: number;
  totalSell: number;
  totalCost: number;
  unPaid: number;
  tax: number;
}

export interface ItemReport {
  discount: number;
  priceAmount: number;
  sellingAmount: number;
  itemCount: number;
  total: number;
  itemName: string;
  itemID: string;
  tax: number;
}

export interface BillingReport {
  billingDate: string;
  billNumber: string;
  Ptotal: number;
  Stotal: number;
  paid: number;
  tax: number;
  discount: number;
}
