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
import { FILTER_BY } from 'src/model/util';

@Component({
  selector: 'app-period-profitloss',
  templateUrl: './period-profitloss.component.html',
  styleUrls: ['./period-profitloss.component.scss'],
})
export class PeriodProfitlossComponent implements OnInit, OnChanges {
  @Input() startDate: any;
  @Input() endDate: any;
  @Input() selectedReport: string;
  @Input() filterDateBy: number;

  // public allItems: I_Items[] = [];
  public reportResultBalance: I_ReportResult[] = null;
  public totalProfit = 0;
  public displayedColumns = [
    'ordernumber',
    'orderDate',
    'allPurchaseValue',
    'allSellValue',
    'profit',
  ];

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
        this.end = this.transform(this.endDate, 'M', 'e') as Date;
        break;
      case FILTER_BY.YEAR:
        this.start = this.transform(this.startDate, 'Y') as Date;
        this.end = this.transform(this.endDate, 'Y', 'e') as Date;
        break;
    }
    console.log(this.start.toLocaleString());
    console.log(this.end.toLocaleString());
    this.reportResultBalance = [...this.filter()];
  }

  filter = (): I_ReportResult[] => {
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


          this.transform(this.start.toString()) <= this.transform(new Date(bill.billDate).toString()) &&
          this.transform(this.end.toString()) >= this.transform(new Date(bill.billDate).toString())
      );
    }

    const billWithDateHeader: {
      [key: string]: I_Bill[];
    } = {} as {
      [key: string]: I_Bill[];
    };
    for (const bill of allBills) {
      const billDate = new Date(bill.billDate);
      if (this.filterDateBy === FILTER_BY.DATE) {
        const arry =
          billWithDateHeader[
            MMM[billDate.getMonth()] +
              billDate.getDate() +
              ', ' +
              billDate.getFullYear()
          ] || [];
        arry.push(bill);
        billWithDateHeader[
          MMM[billDate.getMonth()] +
            billDate.getDate() +
            ', ' +
            billDate.getFullYear()
        ] = [...arry];
      } else if (this.filterDateBy === FILTER_BY.MONTH) {
        const arry =
          billWithDateHeader[
            MMM[billDate.getMonth()] + ', ' + billDate.getFullYear()
          ] || [];
        arry.push(bill);
        billWithDateHeader[
          MMM[billDate.getMonth()] + ', ' + billDate.getFullYear()
        ] = [...arry];
      } else if (this.filterDateBy === FILTER_BY.YEAR) {
        const arry = billWithDateHeader[billDate.getFullYear()] || [];
        arry.push(bill);
        billWithDateHeader[billDate.getFullYear()] = [...arry];
      }
    }

    const headers: string[] = Object.keys(billWithDateHeader);
    const ireport: I_ReportResult[] = [];

    for (const header of headers) {
      let index = 1;
      const rb: I_ReportResult[] = new ReportBalance(
        billWithDateHeader[header]
      ).getTheBalance(this.cartServc);

      const purchase = rb.reduce(
        (allPurchaseValue, item) => (allPurchaseValue += item.allPurchaseValue),
        0
      );
      const sell = rb.reduce(
        (allSellValue, item) => (allSellValue += item.allSellValue),
        0
      );
      const finalrb: I_ReportResult = {
        ordernumber: index,
        orderDate: header,
        allPurchaseValue: purchase,
        allSellValue: sell,
        profit: sell - purchase,
      };
      index += 1;
      ireport.push(finalrb);
    }

    return ireport;
  };
}
