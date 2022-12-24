import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Print } from 'src/model/billClass';

@Component({
  selector: 'app-bill-print-details',
  templateUrl: './bill-print-details.component.html',
  styleUrls: ['./bill-print-details.component.scss'],
})
export class BillPrintDetailsComponent implements OnInit, OnChanges {
  @Input() data: any;

  public currentBillPrint: I_Print = null;
  public displayedColumns: any[] = null;
  constructor(public util: UtilService) {}
  ngOnChanges(changes: SimpleChanges): void {
    this.currentBillPrint = JSON.parse(this.data);
    this.displayedColumns =
      this.currentBillPrint.Items?.length > 0
        ? Object.keys(this.currentBillPrint.Items[0])
        : null;
  }

  ngOnInit(): void {
    this.currentBillPrint = JSON.parse(this.data);
    this.displayedColumns =
      this.currentBillPrint.Items?.length > 0
        ? Object.keys(this.currentBillPrint.Items[0])
        : null;
  }

}
