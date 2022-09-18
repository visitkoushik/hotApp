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
  THEME = 'selectedTheme'
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
  ): number => {
    let price = 0;
    if (!Array.isArray(itemPurchased)) {
      return price;
    }

    itemPurchased
      .filter((e) => e.count > 0)
      .forEach((e: I_CartItem) => {
        const item = cartsrvc.mainItems.find((i) => i.itemId === e.items);
        if (item) {
          price =
            price +
            e.count *
              (item.discountInPercent
                ? (item.itemSellValue * (100 - item.itemSellDiscount)) / 100
                : item.itemSellValue - item.itemSellDiscount);
        }
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
