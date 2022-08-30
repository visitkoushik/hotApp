import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/providers/cart-service.service';
import { ClassBill, I_Print } from 'src/model/billClass';

@Component({
  templateUrl: './confirmed-bill.html',
  styleUrls: ['./confiremd-bill.scss'],
})
export class ConfiremdBillPage implements OnInit {
  public currentBillPrint: I_Print = null;
  public displayedColumns: any[] = null;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((p) => {
      this.currentBillPrint = JSON.parse(p.data);
      this.displayedColumns =
        this.currentBillPrint.Items?.length > 0
          ? Object.keys(this.currentBillPrint.Items[0])
          : null;
    });
  }

  onDone = () => {
    this.cartService.reSet();
    this.router.navigateByUrl('');
  };
}
