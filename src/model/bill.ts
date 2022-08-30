import { I_CartItem } from './cartItem';
import { GENDER } from './util';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_Bill {
  itemPurchased: I_CartItem[];
  customerName: string;
  customerContact: string;
  gender: GENDER;
  discount: number;
  tax: number;
  status: boolean;
  due: number;
  billnumber: number;
  billDate: Date;
  billID: string;
}
