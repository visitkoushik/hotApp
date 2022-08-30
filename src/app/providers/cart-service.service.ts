import { Injectable } from '@angular/core';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_Items } from 'src/model/items';
import { GENDER, I_CreateBillPage } from 'src/model/util';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public createBillPageRef: I_CreateBillPage = null;
  public mainItems: I_Items[] = [];
  // public cartElement: I_CartItem[] = [];
  // public currentBiill: I_Bill = null;
  // public gender: GENDER = GENDER.MALE;
  // public customerName = '';
  // public customerContact = '';
  // public due = 0;
  // public discount = 0;

  // public listOfCartItem: I_CartItem[] = null;
  // public filterTerm: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention

  private globalOrderNumber = 0;
  constructor() {}

  public getOrderNumber = (): number => {
    this.globalOrderNumber++;
    return this.globalOrderNumber;
  };

  public reSet = (): I_CreateBillPage => {
    // this.cartElement = [];
    // this.currentBiill = null;
    // this.gender = GENDER.MALE;
    // this.customerName = '';
    // this.customerContact = '';
    // this.due = 0;
    // this.discount = 0;
    // this.listOfCartItem = null;
    // this.filterTerm = '';

    const icreatPage: I_CreateBillPage = {} as I_CreateBillPage;

    icreatPage.cartElement = [];
    icreatPage.currentBiill = null;
    icreatPage.gender = GENDER.MALE;
    icreatPage.customerName = '';
    icreatPage.customerContact = '';
    icreatPage.due = 0;
    icreatPage.discount = 0;
    icreatPage.listOfCartItem = this.mainItems.map<I_CartItem>(
      (itm: I_Items, inx: number) => ({
        id: inx + 1 + '',
        items: { ...itm },
        count: 0,
      })
    );;
    icreatPage.filterTerm = '';
    return { ...icreatPage };
  };
}
