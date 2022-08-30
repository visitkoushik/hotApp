import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { I_CartItem } from 'src/model/cartItem';
import { I_Items } from 'src/model/items';
import { GENDER } from 'src/model/util';
import { CartService } from '../providers/cart-service.service';

@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.page.html',
  styleUrls: ['./create-bill.page.scss'],
})
export class CreateBillPage implements OnInit {
  ite1: I_Items = {
    itemId: '1',
    itemName: 'Pappy Tea',
    itemPurchaseValue: 12.5,
    itemSellValue: 13.5,
    itemSellDiscount: 0,
    discountInPercent: false,
  };
  ite2: I_Items = {
    itemId: '2',
    itemName: 'Papai Chiken',
    itemPurchaseValue: 10.5,
    itemSellValue: 11.5,
    itemSellDiscount: 0,
    discountInPercent: false,
  };
  mainItems: I_Items[] = [
    this.ite1,
    this.ite2,
    this.ite1,
    this.ite2,
    this.ite1,
    this.ite2,
    this.ite1,
    this.ite2,
    this.ite1,
    this.ite2,
    this.ite1,
    this.ite2,
    this.ite1,
    this.ite2,
    this.ite1,
    this.ite2,
  ];
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CLONED_GENDER = GENDER;

  constructor(
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.cartService.listOfCartItem = this.mainItems.map<I_CartItem>(
      (itm: I_Items, inx: number) => ({
        id: inx + 1 + '',
        items: { ...itm },
        count: 0,
      })
    );
  }
  onModifyItem = (id: string, isIncrease: boolean) => {
   this.cartService.listOfCartItem =this.cartService.listOfCartItem.map((cartElement: I_CartItem) => {
      if (cartElement.id !== id) {
        return cartElement;
      } else {
        return {
          ...cartElement,
          count: isIncrease ? ++cartElement.count : --cartElement.count,
        };
      }
    });
  };
  onNextScreen = () => {
    const selectedItem =this.cartService.listOfCartItem.filter((e) => e.count > 0);
    if (selectedItem) {
      const query: Params = {
        data: JSON.stringify({
          listItem: selectedItem,
          customerContact: this.cartService.customerContact,
          customerName: this.cartService.customerName,
          gender: this.cartService.gender,
          due: this.cartService.due,
          discount: this.cartService.discount,
        }),
      };
      this.router.navigate(['newbill'], {
        relativeTo: this.activeRoute,
        queryParams: query,
      });
    }
  };
}
