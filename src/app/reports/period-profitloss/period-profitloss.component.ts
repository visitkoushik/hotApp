import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChange,
} from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { AlertController } from '@ionic/angular';
import { ConvertToFullDate } from 'src/app/pipe/convert-to-fulldate';
import { CartService } from 'src/app/providers/cart-service.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Bill } from 'src/model/bill';
import { I_BillingReq } from 'src/model/BillingReq';
import { I_CartItem } from 'src/model/cartItem';
import { I_ReportResult, ReportBalance } from 'src/model/ClassBalance';
import { I_Items } from 'src/model/items';
import { I_ReportFilter } from 'src/model/ReportFilter';
import { I_ReportsResp } from 'src/model/ReportFilterResp';
import { ApiEndPoint, FILTER_BY } from 'src/model/util';

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
  @Input() iReportsResp: I_ReportsResp;
  public reportResultBalance: I_ReportResult[] = null;
  public totalProfit = 0;
  public displayedColumns = [
    'billNumber',
    'billingDate',
    'Ptotal',
    'Stotal',
    'profit',
  ];

  public start: Date = null;
  public end: Date = null;
  public transform = new ConvertToFullDate().transform;
  public listArrayBill: I_BillingReq[] = [];
  constructor() {}

  ngOnInit() {

  }
  ngOnChanges(val: I_ReportFilter): void {
    this.startDate = val.startDate?.currentValue;
    this.endDate = val.endDate?.currentValue;
    this.selectedReport = val.selectedReport?.currentValue;
    this.filterDateBy = val.filterDateBy?.currentValue;
  }
}
