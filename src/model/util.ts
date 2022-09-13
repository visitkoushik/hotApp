import { I_Bill } from './bill';
import { I_CartItem } from './cartItem';
import { I_Items } from './items';

/* eslint-disable @typescript-eslint/naming-convention */
export enum GENDER {
  FEMALE,
  MALE,
  OTHERS,
}
export enum FILTER_BY {
  DATE = 1,
  MONTH,
  YEAR,
}

export enum StoreName {
  ITEM = 'items',
  CATEGORY = 'category',
  BILL = 'bills',
  TENANT = 'tenant',
  ORDER = 'order',
}

export interface I_CreateBillPage {
  // cartElement: I_CartItem[];
  currentBiill: I_Bill;
  listOfCartItem: I_CartItem[];
  filterTerm: string;
}

export interface I_ProductReport {
  item: I_Items;
  count: number;
  sellvalue: number;
  order?: number;
}

export interface I_TenantDetails {
  name: string;
  code: string;
  tan: string;
  pan: string;
  tradeLicense: string;
  username: string;
  password: string;
}

export class UtilClass {
  static Get_Total = (itemPurchased: I_CartItem[]): number => {
    let price = 0;
    if (!Array.isArray(itemPurchased)) {
      return price;
    }
    itemPurchased
      .filter((e) => e.count > 0)
      .forEach((e: I_CartItem) => {
        price =
          price +
          e.count *
            (e.items.discountInPercent
              ? (e.items.itemSellValue * (100 - e.items.itemSellDiscount)) / 100
              : e.items.itemSellValue - e.items.itemSellDiscount);
      });
    return +price.toFixed(2);
  };

  static Get_Item_Count = (itemPurchased: I_CartItem[]): number => {
    let count = 0;
    if (!Array.isArray(itemPurchased)) {
      return count;
    }
    itemPurchased.forEach((e: I_CartItem) => {
      count = count + e.count;
    });
    return +count.toFixed(0);
  };
}
