import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';

import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';
import { CartService } from 'src/app/providers/cart-service.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Bill } from 'src/model/bill';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { I_Items } from 'src/model/items';
import { ItemReport, I_ReportsResp } from 'src/model/ReportFilterResp';
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
  public displayedColumns = ['itemName', 'itemCount', 'total'];

  // discount: number;
  // priceAmount: number;
  // sellingAmount: number;
  // itemCount: number;
  // total: number;
  // itemName: string;
  // itemID: string;

  public iReportsResp: I_ReportsResp;
  public itemReport: ItemReport[];
  public start: Date = null;
  public end: Date = null;
  public transform = new ConvertToFullDate().transform;
  constructor(private util: UtilService) {}

  ngOnInit() {
    // this.reportResultBalance = [...this.filter()];
    this.iReportsResp = { ...this.util.iReportsResp };
    this.itemReport = Object.values(this.iReportsResp.items);

    console.log(this.itemReport);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.iReportsResp = { ...this.util.iReportsResp };
    this.itemReport = Object.values(this.iReportsResp.items);

  }
}
