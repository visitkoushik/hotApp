import { Injectable } from '@angular/core';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { GENDER } from 'src/model/util';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  [x: string]: any;

  public cartElement: I_CartItem[] = [];
  public currentBiill: I_Bill = null;
  public gender: GENDER = GENDER.MALE;
  public customerName = '';
  public customerContact = '';
  public due = 0;
  public discount = 0;

  public listOfCartItem: I_CartItem[] = null;
  public filterTerm: string;

  // eslint-disable-next-line @typescript-eslint/naming-convention





  private globalOrderNumber = 0;
  constructor() {}

  public getOrderNumber = (): number => {
    this.globalOrderNumber++;
    return this.globalOrderNumber;
  };

  public reSet = () => {
    this.cartElement = [];
    this.currentBiill = null;
    this.gender  = GENDER.MALE;
    this.customerName = '';
    this.customerContact = '';
    this.due = 0;
    this. discount = 0;
    this.listOfCartItem  = null;
    this. filterTerm='';
  };
}
