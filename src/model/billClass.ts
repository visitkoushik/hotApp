import { CartService } from 'src/app/providers/cart-service.service';
import { I_Bill } from './bill';
import { I_CartItem } from './cartItem';
import { GENDER, UtilClass } from './util';
// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_Print {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Date: Date;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Name: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Contact: string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  'Order NO.': string;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Items: {
    item: number;
    itemName: string;
    qty: number;
    rate: number;
    price: number;
    disc: string;
  }[];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  TotalPurchaseValue: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Total: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Discount: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Tax: number;
  // eslint-disable-next-line @typescript-eslint/naming-convention
  Payable: number;
}
export class ClassBill {
  public bill: I_Bill = {} as I_Bill;
  constructor(itemPurchased: I_Bill);
  constructor(
    itemPurchased: I_CartItem[],
    customerName: string,
    customerContact: string,
    gender: GENDER,
    orderNumber: number,
    status: boolean,
    discount: number,
    paid: number,
    total: number,

  );
  constructor(
    itemPurchased?: I_CartItem[] | I_Bill,
    customerName?: string,
    customerContact?: string,
    gender?: GENDER,
    orderNumber?: number,
    status?: boolean,
    discount?: number,
    paid?: number,
    total?: number,
  ) {
    if (!Array.isArray(itemPurchased) && this.isBillObject(itemPurchased)) {
      this.bill = { ...itemPurchased };
    } else {
      this.bill.itemPurchased = [...itemPurchased];
      this.bill.customerName = customerName;
      this.bill.customerContact = customerContact;
      this.bill.gender = gender;
      this.bill.status = status;
      this.bill.billnumber = orderNumber;
      this.bill.discount = discount ? discount : 0;
      this.bill.billID = Date.now() + '';
      this.bill.billDate = new Date();
      this.bill.tax = 0;
      this.bill.paid=paid;
      this.bill.total=total;
      this.bill.due = this.bill.total-this.bill.paid;
    }
  }

  get billingDate(): Date {
    return this.bill.billDate;
  }

  get orderNumber(): string {
    return this.bill.billnumber + '';
  }

  get status(): boolean {
    return this.bill.status;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set billingDate(dt: Date) {
    this.bill.billDate = dt;
  }

  // eslint-disable-next-line @typescript-eslint/adjacent-overload-signatures
  set status(status: boolean) {
    this.bill.status = status;
  }

  set updateItems(items: I_CartItem[]) {
    this.bill.itemPurchased = [...items];
  }

  isBillObject(object: any): object is I_Bill {
    return 'billID' in object;
  }

  getTotal = (cartServc: CartService): number =>
    UtilClass.Get_Total(cartServc, this.bill.itemPurchased);
  getItemCount = (): number =>
    UtilClass.Get_Item_Count(this.bill.itemPurchased);

  getPurchaseCost = (cartServc: CartService): number => {
    let price = 0;
    this.bill.itemPurchased.forEach((e: I_CartItem) => {
      const item = cartServc.mainItems.find((i) => i.itemId === e.items);
      price = price + e.count * (item?.itemPurchaseValue||0);
    });
    return +price.toFixed(2);
  };

  getPrintValue = (cartServc: CartService): I_Print => {
    const total: number = this.getTotal(cartServc);
    const purchaseTotal: number = this.getPurchaseCost(cartServc);
    const printableItemList = this.bill.itemPurchased.map(
      (e: I_CartItem, inx: number) => {
        const item = cartServc.mainItems.find((i) => i.itemId === e.items);
        return {
          item: inx + 1,
          itemName: item.itemName,
          qty: e.count,
          rate: item.itemSellValue,
          disc: item.discountInPercent
            ? item.itemSellDiscount + '%'
            : item.itemSellDiscount + 'Rs',
          price: item.discountInPercent
            ? (e.count * item.itemSellValue * (100 - item.itemSellDiscount)) /
              100
            : e.count * (item.itemSellValue - item.itemSellDiscount),
        };
      }
    );
    return {
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Date: this.bill.billDate,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Name: `${this.getGender()}${this.getTitleCase(this.bill.customerName)}`,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Contact: this.bill.customerContact ? this.bill.customerContact : '',
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'Order NO.': this.orderNumber,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Items: printableItemList,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      TotalPurchaseValue: purchaseTotal,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Total: total,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Discount: this.bill.discount,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Tax: (this.bill.tax * (total - this.bill.discount)) / 100,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      Payable: (total - this.bill.discount) * (1 + this.bill.tax / 100),
    };
  };

  getTitleCase = (str: string) =>
    str.replace(
      /\w\S*/g,
      (word: string) =>
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
    );

  getGender = () => {
    switch (this.bill.gender) {
      case GENDER.MALE:
        return 'Mr.';
      case GENDER.FEMALE:
        return 'Ms.';
      case GENDER.OTHERS:
        return 'Mx.';
    }
  };
}
