import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { I_Bill } from 'src/model/bill';
import { ClassBill } from 'src/model/billClass';
import { CartService } from '../providers/cart-service.service';

@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.page.html',
  styleUrls: ['./all-bills.page.scss'],
})
export class AllBillsPage implements OnInit {
  public currentDate: Date = null;
  public allBills: I_Bill[] = [];
  constructor(
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.currentDate = new Date();
  }

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      this.allBills = [...this.cartService.allBiills];
    });
  }

  onClickItemBill = (billItem: I_Bill) => {
    this.router.navigate(['existingbill'], {
      relativeTo: this.activeRoute,
      queryParams: { data: JSON.stringify(billItem) },
    });
  };

  trackByFn = (inx, item: I_Bill) => item.billID;
}
