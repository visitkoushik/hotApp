import { CartService } from 'src/app/providers/cart-service.service';
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
  THEME = 'selectedTheme',
}

export enum ApiEndPoint {
  ITEM_ADD = 'item',
  ITEM_UPDATE = 'item/:id',
  EMPLOYEE_ADD = 'employee',
  EMPLOYEE_UPDATE = 'employee/:id',
  ITEM_LIST = 'item',
  CATEGORY_ADD = 'category',
  CATEGORY_UPDATE = 'category/:id',
  CATEGORY_LIST = 'category',

  METADATA = 'metadata',
  LOGIN = 'auth/login',
  BILL_ADD = 'billing',
  BILL_UPDATE = 'billing/:id',
  BILL_UPDATE_PAYDUE = 'billing/paydue/:id',
  BILL_LIST = 'billing',
  BILL_DELETE = 'billing/:id',
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
  static Get_Total = (
    cartsrvc: CartService,
    itemPurchased: I_CartItem[]
  ): { price: number; totalDiscount: number } => {
    debugger;
    let price = 0;
    let totalDiscount = 0;
    if (!Array.isArray(itemPurchased)) {
      return { price, totalDiscount };
    }

    itemPurchased
      .filter((e) => e.count > 0)
      .forEach((e: I_CartItem) => {
        const item = e.items;
        if (item) {
          item.discount = item.discount || 0;
          item.isDiscountInPercentage = item.isDiscountInPercentage == true;
          totalDiscount =
            totalDiscount +
            e.count *
              (item.isDiscountInPercentage
                ? (item.itemPrice.sellingAmount * item.discount) / 100
                : item.discount);
          price =
            price +
            e.count *
              (item.isDiscountInPercentage
                ? (item.itemPrice.sellingAmount * (100 - item.discount)) / 100
                : item.itemPrice.sellingAmount - item.discount);
        }
      });
    return {
      price: +price.toFixed(2),
      totalDiscount: +totalDiscount.toFixed(2),
    };
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
