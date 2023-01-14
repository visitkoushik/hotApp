import { CartService } from 'src/app/providers/cart-service.service';
import { I_Bill } from './bill';
import { ClassBill } from './billClass';
import { I_CartItem } from './cartItem';

// eslint-disable-next-line @typescript-eslint/naming-convention
export interface I_ReportResult {
  ordernumber: number;
  orderDate: Date | string;
  allPurchaseValue: number;
  allSellValue: number;
  profit: number;
}

// eslint-disable-next-line @typescript-eslint/naming-convention
export class ReportBalance {
  public bills: I_Bill[] = [];

  constructor(billlist: I_Bill[]) {
    this.bills = [...billlist];
  }

  public getTheBalance = (cartsrvc: CartService): I_ReportResult[] =>
    this.bills.map((b: I_Bill) => {
      const cb = new ClassBill(b);
      const purchase = cb.getPurchaseCost(cartsrvc);
      const sell = (cb.getTotal(cartsrvc) - b.discount) * (1 + b.tax / 100);
      return {
        ordernumber: b.billnumber,
        orderDate: b.billDate,
        allPurchaseValue: purchase,
        allSellValue: sell,
        profit: sell - purchase,
      };
    });
}
