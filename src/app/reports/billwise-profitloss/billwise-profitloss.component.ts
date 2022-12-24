import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { CartService } from 'src/app/providers/cart-service.service';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { I_Items } from 'src/model/items';

@Component({
  selector: 'app-profitloss-daterange',
  templateUrl: './billwise-profitloss.component.html',
  styleUrls: ['./billwise-profitloss.component.scss'],
})
export class BillWiseProfitlossComponent implements OnInit, OnChanges {
  @Input() startDate: Date;
  @Input() endDate: Date;
  @Input() selectedReport: string;

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
  constructor(private cartServc: CartService) {}

  ngOnInit() {
    // this.reportResultBalance = [...this.filter()];
  }
  ngOnChanges(val: {
    startDate?: any;
    endDate?: any;
    selectedReport?: any;
  }): void {
    console.log(val);
    this.startDate = new Date(val.startDate?.currentValue);
    this.endDate = new Date(val.endDate?.currentValue);
    this.selectedReport = val.selectedReport?.currentValue;

    this.reportResultBalance = [...this.filter()];
  }

  filter = (): I_ReportResult[] => {
    let allBills: I_Bill[] = [];

    if (this.selectedReport && this.selectedReport !== '-1') {
      allBills =
        this.cartServc.allBiills.filter(
          (bill: I_Bill) =>
            bill.itemPurchased.findIndex(
              (e: I_CartItem) => e.items.id === this.selectedReport
            ) > -1
        ) || [];
    } else {
      allBills = [...this.cartServc.allBiills].filter(b=>b.status);
    }
    if (this.endDate && this.startDate) {
      allBills = allBills.filter(
        (bill: I_Bill) =>
          this.startDate <= bill.billDate && this.endDate >= bill.billDate
      );
    }

    return new ReportBalance(allBills).getTheBalance(this.cartServc);
  };
}
