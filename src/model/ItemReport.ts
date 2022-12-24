import { CartService } from 'src/app/providers/cart-service.service';
import { I_CartItem } from './cartItem';
import { I_Items } from './items';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_ReportCart {
  ordernumber: number;
  orderDate: Date | string;
  count: number;
  totalProfit: number;
}
export class ClassReportCart {
  public itemList: I_CartItem[] = [];

  constructor(itemList: I_CartItem[]) {
    this.itemList = [...itemList];
  }

  // public getTheBalance = (cartsrvc: CartService): I_ReportCart[] =>
  //   this.itemList.map((b: I_CartItem,inx:number) => {
  //     const item:I_Items = cartsrvc.mainItems.find(e=>e.itemId === b.items);

  //     return {
  //       ordernumber: (inx+1);
  //       orderDate: Date | string;
  //       count: number;
  //       totalProfit: number;
  //     };
  //   });
}
