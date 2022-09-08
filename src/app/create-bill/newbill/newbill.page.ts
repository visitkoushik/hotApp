import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GENDER } from 'src/model/util';
import { CartService } from 'src/app/providers/cart-service.service';
import { I_CartItem } from 'src/model/cartItem';
import { ClassBill } from 'src/model/billClass';

@Component({
  selector: 'app-newbill',
  templateUrl: './newbill.page.html',
  styleUrls: ['./newbill.page.scss'],
})
export class NewbillPage implements OnInit {
  data: any = null;

  constructor(
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      this.data = JSON.parse(p.data);
    });
  }

  onConfirm = async () => {
    const billClass = this.cartService.createBillPageRef?.currentBiill?.billID
      ? new ClassBill({
          ...this.cartService.createBillPageRef.currentBiill,
          itemPurchased: this.data.listItem,
          customerName: this.data.customerName,
          customerContact: this.data.customerContact,
          gender: this.data.gender,
          due: this.data.due,
          discount: this.data.discount,
        })
      : new ClassBill(
          this.data.listItem,
          this.data.customerName,
          this.data.customerContact,
          this.data.gender,
          await this.cartService.getOrderNumber(),
          false,
          this.data.due,
          this.data.discount
        );
    this.cartService.createBillPageRef.currentBiill = billClass.bill;

    this.router.navigate(['confirmedbill'], {
      relativeTo: this.activeRoute,
      queryParams: { data: JSON.stringify(billClass.getPrintValue()) },
    });
  };
  onModelChange = () => {};
}
