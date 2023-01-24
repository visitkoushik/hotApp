import { CartService } from 'src/app/providers/cart-service.service';
import { I_Bill } from './bill';
import { I_CartItem } from './cartItem';
import { I_Items } from './items';

/* eslint-disable @typescript-eslint/naming-convention */
export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
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
  PRINTER = 'selectedPrinter',
  PAGEBILL = 'pageBill',
  PAGEREPORT = 'pageReport',
  LOGIN = 'loginstore'
}

export enum ApiEndPoint {
  ITEM_ADD = 'item',
  ITEM_UPDATE = 'item/:id',
  EMPLOYEE_ADD = 'employee',
  EMPLOYEE_UPDATE = 'employee/:id',
  EMPLOYEE_PROFILE = 'employee/profile',
  EMPLOYEE_LIST = 'employee/:id',
  ITEM_LIST = 'item',
  CATEGORY_ADD = 'category',
  CATEGORY_UPDATE = 'category/:id',
  CATEGORY_LIST = 'category',

  BRANCH_ADD='chain',
  BRANCH_UPDATE='chain/:id',
  BRANCH_LIST='chain',
  BRANCH_CODE='chain/code',
  BRANCH_DELETE = 'billing/:id',

  METADATA = 'metadata',
  BILL_ADD = 'billing',
  BILL_UPDATE = 'billing/:id',
  BILL_UPDATE_PAYDUE = 'billing/paydue/:id',
  BILL_LIST = 'billing',
  BILL_DELETE = 'billing/:id',

  RESETPASSWORD = 'employee/resetpassword',
  CHANGEASSWORD = 'employee/changepassword',

  LOGIN = 'auth/login',
  LOGOUT = 'auth/logout',

  REPORT_BILLWISE = 'reports/billwise',
  REPORT_ITEMWISE = 'reports/itemwise',

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
