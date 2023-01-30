import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { HttpService } from 'src/app/providers/http.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_BillingItem, I_BillingReq } from 'src/model/BillingReq';
import { I_CartItem } from 'src/model/cartItem';
import { ApiEndPoint, I_CreateBillPage } from 'src/model/util';

@Component({
  selector: 'app-update-bill',
  templateUrl: './update-bill.component.html',
  styleUrls: ['./update-bill.component.scss'],
})
export class UpdateBillComponent implements OnInit {
  creatBillPage: I_CreateBillPage = null;
  trackByFn = (inx: number, item: I_CartItem) => item.id;
  paid: number = 0;
  constructor(
    @Inject(MAT_DIALOG_DATA) public currentBill: I_BillingReq,
    public dialogRef: MatDialogRef<UpdateBillComponent>,
    public util: UtilService,
    private cartService: CartService
  ) {
    this.fetchData(currentBill.branchCode);
    this.cartService.setDefaultBill();

    this.creatBillPage = { ...this.cartService.createBillPageRef };
  }

  ngOnInit() {
    this.fetchData(this.currentBill.branchCode);
  }
  closeDialog(result) {
    this.dialogRef.close(result);
  }
  onModifyItem(id: string, isIncrease: boolean) {
    this.creatBillPage.listOfCartItem = this.creatBillPage.listOfCartItem.map(
      (cartElement: I_CartItem) => {
        if (cartElement.id !== id) {
          return cartElement;
        } else {
          return {
            ...cartElement,
            count: isIncrease ? ++cartElement.count : --cartElement.count,
          };
        }
      }
    );
  }

  private fetchData = (branchCode: string) => {
    this.cartService.getAllItem(branchCode, true, () => {
      if (
        !this.cartService.createBillPageRef ||
        !this.cartService.createBillPageRef.currentBiill
      ) {
        this.cartService.setDefaultBill();
      } else {
        this.cartService.updateDefaultBill();
      }
      this.creatBillPage = { ...this.cartService.createBillPageRef };
    });
  };

  onAddScreen = () => {
    const newBilltoUpdate: I_BillingReq = { ...this.currentBill };
    let c = this.creatBillPage.listOfCartItem.filter((e) => e.count > 0);
    let billintItem: I_BillingItem[] = c.map((cart: I_CartItem) => {
      const billingItem: I_BillingItem = {} as I_BillingItem;
      billingItem.itemCount = cart.count;
      billingItem.itemID = cart.items.id;
      billingItem.itemName = cart.items.itemName;
      billingItem.priceAmount = cart.items.itemPrice.priceAmount;
      billingItem.sellingAmount = cart.items.itemPrice.sellingAmount;
      billingItem.discount = cart.items.discount;
      billingItem.isDiscountInPercentage = cart.items.isDiscountInPercentage;

      return billingItem;
    });
    newBilltoUpdate.billingItemList = [...billintItem];
    newBilltoUpdate.paid += this.paid;
    this.dialogRef.close(newBilltoUpdate);
  };
}
