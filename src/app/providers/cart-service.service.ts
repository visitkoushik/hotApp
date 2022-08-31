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
  public allBiills: I_Bill[] = [] as I_Bill[];

  private globalOrderNumber = 0;
  constructor() {}

  public getOrderNumber = (): number => {
    this.globalOrderNumber++;
    return this.globalOrderNumber;
  };

  public setDefault = () => {

    const icreatPage: I_CreateBillPage = {} as I_CreateBillPage;

    // icreatPage.cartElement = [];
    icreatPage.currentBiill = {} as I_Bill;
    icreatPage.currentBiill .gender = GENDER.MALE;
    icreatPage.currentBiill .customerName = '';
    icreatPage.currentBiill .customerContact = '';
    icreatPage.currentBiill .due = 0;
    icreatPage.currentBiill .discount = 0;
    icreatPage.listOfCartItem = this.mainItems.map<I_CartItem>(
      (itm: I_Items, inx: number) => ({
        id: inx + 1 + '',
        items: { ...itm },
        count: 0,
      })
    );;
    icreatPage.filterTerm = '';
    this.createBillPageRef =  { ...icreatPage };

  };
}
