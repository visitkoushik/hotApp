import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';
import { ShortDatePipe } from 'src/app/pipe/short-date.pipe';
import { CartService } from 'src/app/providers/cart-service.service';
import { I_Bill } from 'src/model/bill';
import { ClassBill } from 'src/model/billClass';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { ClassReportCart, I_ReportCart } from 'src/model/ItemReport';
import { I_Items } from 'src/model/items';
import { FILTER_BY, I_ProductReport } from 'src/model/util';
// eslint-disable-next-line @typescript-eslint/naming-convention
interface I_ItemReport {
  orderNumber: number;
  date: string;
  count: number;
  total: number;
  selltotal: number;
  purchaseCost: number;
  grandProfit: number;
}

@Component({
  selector: 'app-itemwise',
  templateUrl: './itemwise.page.html',
  styleUrls: ['./itemwise.page.scss'],
})
export class ItemwisePage implements OnInit, OnChanges {
  public startDate: string = null;
  public endDate: string = null;
  public selectedReport = '-1';
  public filterDateBy: FILTER_BY;

  public pageheading: string | Date = '';
  // eslint-disable-next-line @typescript-eslint/naming-convention
  FILTERBY = FILTER_BY;
  public itemName = '';
  // public allItems: I_Items[] = [];
  public reportResultBalance: I_ItemReport[] = null;
  public totalProfit = 0;
  public displayedColumns = ['order', 'date', 'count', 'selltotal', 'profit'];

  public start: Date = null;
  public end: Date = null;
  public transform = new ConvertToFullDate().transform;
  constructor(
    private cartServc: CartService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      this.startDate = p.startDate;
      this.endDate = p.endDate;
      this.selectedReport = p.selectedReport;
      this.filterDateBy = +p.filterDateBy;

      this.itemName =
        this.cartServc.mainItems.find((e) => e.id === this.selectedReport)
          ?.itemName || '';
      const shortDate = new ShortDatePipe();
      const stdt = shortDate.transform(new Date(this.startDate));
      const nddt = shortDate.transform(new Date(this.endDate));

      this.pageheading =
        (this.filterDateBy === FILTER_BY.DATE ? stdt : this.startDate) +
        ' - ' +
        (this.filterDateBy === FILTER_BY.DATE ? nddt : this.endDate);

      const transform = new ConvertToFullDate().transform;
      switch (this.filterDateBy) {
        case FILTER_BY.DATE:
          this.start = new Date(this.startDate);
          this.end = new Date(this.endDate);
          break;
        case FILTER_BY.MONTH:
          this.start = transform(this.startDate, 'M') as Date;
          this.end = transform(this.endDate, 'M', 'e') as Date;
          break;
        case FILTER_BY.YEAR:
          this.start = transform(this.startDate, 'Y') as Date;
          this.end = transform(this.endDate, 'Y', 'e') as Date;
          break;
      }

      this.reportResultBalance = [...this.filter()];
    });
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
        this.end = this.transform(this.endDate, 'M', 'e') as Date;
        break;
      case FILTER_BY.YEAR:
        this.start = this.transform(this.startDate, 'Y') as Date;
        this.end = this.transform(this.endDate, 'Y', 'e') as Date;
        break;
    }
    this.reportResultBalance = [...this.filter()];
  }

  filter = (): I_ItemReport[] => {
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

    allBills = [...this.cartServc.allBiills].filter(
      e => e.status && e.itemPurchased.findIndex(
          (ip) => ip.items.id === this.selectedReport
        ) > -1
    );

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
        const purchaseinfo: I_CartItem | undefined = bill.itemPurchased.find(
          (e) => e.items.id === this.selectedReport
        );

        arry.push(bill);
        billWithDateHeader[billDate.getFullYear()] = [...arry];
      }
    }

    const headers: string[] = Object.keys(billWithDateHeader);
    const ireport: I_ItemReport[] = [];
    for (const header of headers) {
      let index = 1;
      const listOfCartInBill: I_CartItem[] = billWithDateHeader[header].map(
        (iBill: I_Bill) =>
          iBill.itemPurchased.find(
            (i) => i.items.id === this.selectedReport
          )
      );
      let totalcount = 0;
      let sellcost = 0;
      let purchaseCost = 0;
      for (const cartitem of listOfCartInBill) {
        totalcount += cartitem.count;
        sellcost +=
          (cartitem.items.itemPrice.sellingAmount - cartitem.items.discount) *
          cartitem.count;
        purchaseCost += cartitem.items.itemPrice.priceAmount * cartitem.count;
      }

      const grandProfit = sellcost - purchaseCost;
      const finalrb = {} as I_ItemReport;
      finalrb.orderNumber = index;
      finalrb.count = totalcount;
      finalrb.selltotal = sellcost;
      finalrb.purchaseCost = purchaseCost;
      finalrb.grandProfit = grandProfit;
      finalrb.date = header;
      ireport.push({ ...finalrb });
      index++;
    }
    return ireport;
  };
}
