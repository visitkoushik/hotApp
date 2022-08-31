import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/providers/cart-service.service';
import { I_Bill } from 'src/model/bill';
import { ClassBill, I_Print } from 'src/model/billClass';

@Component({
  selector: 'app-existingbill',
  templateUrl: './existingbill.page.html',
  styleUrls: ['./existingbill.page.scss'],
})
export class ExistingbillPage implements OnInit {

  public currentBill: ClassBill = null;
  public currentBillPrint: I_Print = null;
  public displayedColumns: any[] = null;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((p) => {
      const ibill= JSON.parse(p.data);
      this.currentBill = new ClassBill(ibill);
      this.currentBillPrint = this.currentBill.getPrintValue();
      this.displayedColumns =
        this.currentBillPrint.Items?.length > 0
          ? Object.keys(this.currentBillPrint.Items[0])
          : null;
    });
  }


}
