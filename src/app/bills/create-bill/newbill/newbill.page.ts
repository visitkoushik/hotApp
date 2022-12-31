import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Location } from '@angular/common';
import { GENDER, UtilClass } from 'src/model/util';
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
  total = 0;
  totalDiscount = 0;

  constructor(
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private location: Location
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      this.data = JSON.parse(p.data);
      this.data = {
        ...this.data,
        customerContact:
          this.cartService.createBillPageRef.currentBiill.customerContact,
        customerName:
          this.cartService.createBillPageRef.currentBiill.customerName,
        gender: this.cartService.createBillPageRef.currentBiill.gender,
        paid: this.cartService.createBillPageRef.currentBiill.paid,
        total: this.cartService.createBillPageRef.currentBiill.total,
        discount: this.cartService.createBillPageRef.currentBiill.discount,
      };
    });
  }

  onNext = async () => {
    let billtTotal = UtilClass.Get_Total(this.cartService, this.data.listItem);
    this.total = billtTotal.price;
    this.totalDiscount = billtTotal.totalDiscount;
    const billClass = this.cartService.createBillPageRef?.currentBiill?.billID
      ? new ClassBill({
          ...this.cartService.createBillPageRef.currentBiill,
          itemPurchased: this.data.listItem,
          customerName: this.data.customerName,
          customerContact: this.data.customerContact,
          gender: this.data.gender,
          paid: this.data.paid,
          total: this.total,
          discount: this.data.discount,
        })
      : new ClassBill(
          this.data.listItem,
          this.data.customerName,
          this.data.customerContact,
          this.data.gender,
          await this.cartService.getOrderNumber(),
          false,
          this.data.discount,
          this.data.paid,
          this.total
        );
    this.cartService.createBillPageRef.currentBiill = billClass.bill;

    this.router.navigate(['tab/createbill/newbill/confirmedbill'], {
      relativeTo: this.activeRoute.root,
      replaceUrl: false,
      queryParams: {
        data: JSON.stringify(billClass.getPrintValue(this.cartService)),
      },
    });
  };
  onChange = () => {
    this.data.discount = !this.data.discount ? 0 : this.data.discount;
    this.data.due = !this.data.due ? 0 : this.data.due;
    const queryParams: Params = { data: JSON.stringify(this.data) };

    this.cartService.createBillPageRef.currentBiill.discount =
      this.data.discount;

    this.router.navigate([], {
      relativeTo: this.activeRoute,
      replaceUrl: true,
      queryParams,
    });
  };
  onClickInput = (target) => target.select();
}
