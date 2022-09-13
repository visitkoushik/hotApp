import { Injectable } from '@angular/core';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_Category } from 'src/model/category';
import { I_Items } from 'src/model/items';
import { GENDER, I_CreateBillPage } from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public createBillPageRef: I_CreateBillPage = null;
  public mainItems: I_Items[] = [];
  public allBiills: I_Bill[] = [] as I_Bill[];
  public categoryList: I_Category[] = [] as I_Category[];
  public globalOrderNumber = 0;
  constructor(private store: AppStorageService) {}

  public getOrderNumber = async (): Promise<number> => {
    const dt = new Date();
    const key = `${dt.getDay()}-${dt.getMonth()}-${dt.getFullYear()}`;
    const eKey = await this.store.getStorage('order').catch((e) => {});

    this.globalOrderNumber = eKey && eKey.key === key ? eKey.order : 0;

    this.globalOrderNumber++;
    return new Promise((res) => {
      res(this.globalOrderNumber);
    });
  };

  public setDefaultBill = () => {
    const icreatPage: I_CreateBillPage = {} as I_CreateBillPage;

    // icreatPage.cartElement = [];
    icreatPage.currentBiill = {} as I_Bill;
    icreatPage.currentBiill.gender = GENDER.MALE;
    icreatPage.currentBiill.customerName = '';
    icreatPage.currentBiill.customerContact = '';
    icreatPage.currentBiill.due = 0;
    icreatPage.currentBiill.discount = 0;
    icreatPage.listOfCartItem = this.mainItems
      .filter((e) => e.isAvailable)
      .map<I_CartItem>((itm: I_Items, inx: number) => ({
        id: inx + 1 + '',
        items: { ...itm },
        count: 0,
      }));
    icreatPage.filterTerm = '';
    this.createBillPageRef = { ...icreatPage };
  };

  public updateDefaultBill = () => {
    const listOfCartItem = this.mainItems
      .filter((e) => e.isAvailable)
      .map<I_CartItem>((itm: I_Items, inx: number) => {
        const cartItem = this.createBillPageRef.listOfCartItem.find(
          (e) => e.items.itemId === itm.itemId
        );

        return cartItem
          ? { ...cartItem, items: { ...itm } }
          : {
              id: inx + 1 + '',
              items: { ...itm },
              count: 0,
            };
      });
    this.createBillPageRef = {
      ...this.createBillPageRef,
      listOfCartItem: [...listOfCartItem],
    };
  };
}
