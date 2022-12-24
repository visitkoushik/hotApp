import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';

import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';
import { CartService } from 'src/app/providers/cart-service.service';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { I_Items } from 'src/model/items';
import { FILTER_BY, I_ProductReport } from 'src/model/util';

@Component({
  selector: 'app-period-item-profit',
  templateUrl: './item-profit.component.html',
  styleUrls: ['./item-profit.component.scss'],
})
export class ItemProfitComponent implements OnInit, OnChanges {
  @Input() startDate: any;
  @Input() endDate: any;
  @Input() selectedReport: string;
  @Input() filterDateBy: number;

  // public allItems: I_Items[] = [];
  public reportResultBalance: I_ProductReport[] = null;
  public totalProfit = 0;
  public displayedColumns = ['order', 'item', 'count', 'sellvalue'];

  public start: Date = null;
  public end: Date = null;
  public transform = new ConvertToFullDate().transform;
  constructor(private cartServc: CartService) {}

  ngOnInit() {
    // this.reportResultBalance = [...this.filter()];
  }
  ngOnChanges(val: {
    startDate?: any;
    endDate?: any;
    selectedReport?: any;
    filterDateBy?: any;
  }): void {
    console.log(val);
    this.startDate = val.startDate?.currentValue;
    this.endDate = val.endDate?.currentValue;
    this.selectedReport = val.selectedReport?.currentValue;
    this.filterDateBy = val.filterDateBy?.currentValue;


    switch (this.filterDateBy) {
      case FILTER_BY.DATE:
        this.start = new Date(this.startDate);
        this.end = new Date(this.endDate);
        break;
      case FILTER_BY.MONTH:
        this.start = this.transform(this.startDate, 'M') as Date;
        this.end = this.transform(this.endDate, 'M','e') as Date;
        break;
      case FILTER_BY.YEAR:
        this.start = this.transform(this.startDate, 'Y') as Date;
        this.end = this.transform(this.endDate, 'Y','e') as Date;
        break;
    }
    this.reportResultBalance = [...this.filter()];
  }

  filter = (): I_ProductReport[] => {
    let allBills: I_Bill[] = [];
    const MMM = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ];
    if (this.selectedReport && this.selectedReport !== '-1') {
      //TODO later
    } else {
      allBills = [...this.cartServc.allBiills].filter(b=>b.status);
    }
    if (this.endDate && this.startDate) {
      allBills = allBills.filter(
        (bill: I_Bill) =>
        this.transform(this.start.toString()) <= this.transform(bill.billDate.toString()) &&
            this.transform(this.end.toString()) >= this.transform(bill.billDate.toString())
      );
    }
    const billWithIDHeader: {
      [key: string]: I_ProductReport;
    } = {} as {
      [key: string]: I_ProductReport;
    };
    for (const bill of allBills) {
      bill.itemPurchased.forEach((cartItem: I_CartItem) => {
        const item =  {...cartItem.items} ;
        if (billWithIDHeader[item.id]) {
          billWithIDHeader[item.id] = {
            item,
            count: billWithIDHeader[item.id].count + cartItem.count,
            sellvalue:
              (item.itemPrice.sellingAmount - item.discount) *
              cartItem.count +
              billWithIDHeader[item.id].sellvalue,
          };
        } else {
          billWithIDHeader[item.id] = {
            item,
            count: cartItem.count,
            sellvalue:
              (item.itemPrice.priceAmount - item.discount) *
              cartItem.count,
          };
        }
      });
    }

    const allItem = this.cartServc.mainItems.map((e: I_Items, i: number) => {
      if (billWithIDHeader[e.id]) {
        return {...billWithIDHeader[e.id],order: i+1};
      } else {
        return {
          item: e,
          count: 0,
          sellvalue: 0,
          order: i + 1
        };
      }
    });

    return [...allItem];
  };
}
