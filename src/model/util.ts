import { I_Bill } from './bill';
import { I_CartItem } from './cartItem';

/* eslint-disable @typescript-eslint/naming-convention */
export enum GENDER {
  FEMALE,
  MALE,
  OTHERS,
}

export interface I_CreateBillPage {
  cartElement: I_CartItem[];
  currentBiill: I_Bill;
  gender: GENDER;
  customerName: string;
  customerContact: string;
  due: number;
  discount: number;
  listOfCartItem: I_CartItem[];
  filterTerm: string;
}
