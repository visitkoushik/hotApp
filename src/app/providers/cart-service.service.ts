import { Injectable } from '@angular/core';
import { AppResponse } from 'src/model/AppResponse';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_Category } from 'src/model/category';
import { I_Items } from 'src/model/items';
import {
  ApiEndPoint,
  GENDER,
  I_CreateBillPage,
  StoreName,
} from 'src/model/util';
import { AppStorageService } from '../app-storage/app-storage.service';
import { HttpService } from './http.service';
import { UtilService } from './utilservice.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  public createBillPageRef: I_CreateBillPage = null;
  public mainItems: I_Items[] = [];
  public allBiills: I_Bill[] = [] as I_Bill[];
  // public categoryList: I_Category[] = [] as I_Category[];
  public globalOrderNumber = 0;

  public maxDate;
  constructor(
    private store: AppStorageService,
    private httpService: HttpService,
    private utilService: UtilService
  ) {
    this.maxDate = new Date();
  }

  public getOrderNumber = async (): Promise<number> => {
    const dt = new Date();
    const key = `${dt.getDay()}-${dt.getMonth()}-${dt.getFullYear()}`;
    const eKey = await this.store.getStorage(StoreName.ORDER).catch((e) => {});

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
      .filter((e) => e.available)
      .map<I_CartItem>((itm: I_Items, inx: number) => ({
        id: inx + 1 + '',
        items: { ...itm },
        count: 0,
      }));
    icreatPage.filterTerm = '';
    this.createBillPageRef = { ...icreatPage };
  };

  public updateDefaultBill = () => {
    const listOfCartItem: I_CartItem[] = this.mainItems
      .filter((e) => e.available)
      .map<I_CartItem>((itm: I_Items, inx: number) => {
        const cartItem: I_CartItem = this.createBillPageRef.listOfCartItem.find(
          (e) => e.items.id === itm.id
        );

        return (
          cartItem
            ? { ...cartItem, items: { ...itm } }
            : {
                id: inx + 1 + '',
                items: { ...itm },
                count: 0,
              }
        ) as I_CartItem;
      });
    this.createBillPageRef = {
      ...this.createBillPageRef,
      listOfCartItem: [...listOfCartItem],
    };
  };

  public getAllItem = (
    availableStatus: boolean | null,
    onSuccess?: Function,
    onFail?: Function
  ) => {
    let promise: Promise<AppResponse<I_Items[]>>;

    this.utilService.isLoading = true;
    if (availableStatus === null) {
      promise = this.httpService.get(ApiEndPoint.ITEM_LIST);
    } else {
      promise = this.httpService.get(ApiEndPoint.ITEM_LIST, 'available=true');
    }

    promise
      .then((e: AppResponse<I_Items[]>) => {
        this.mainItems = [...e.responseObject];
        if (onSuccess) {
          onSuccess();
        }
        this.utilService.isLoading = false;
      })
      .catch((e) => {
        this.mainItems = [];
        if (onFail) {
          onFail();
        }
        this.utilService.isLoading = false;
      });
  };
}
