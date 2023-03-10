import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Params,
  Router,
} from '@angular/router';
import { I_CartItem } from 'src/model/cartItem';
import { I_Items } from 'src/model/items';
import { GENDER, I_CreateBillPage, StoreName } from 'src/model/util';
import { CartService } from '../../providers/cart-service.service';

import { AppStorageService } from '../../app-storage/app-storage.service';
import { UtilService } from 'src/app/providers/utilservice.service';
@Component({
  selector: 'app-create-bill',
  templateUrl: './create-bill.page.html',
  styleUrls: ['./create-bill.page.scss'],
})
export class CreateBillPage implements OnInit {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  CLONED_GENDER = GENDER;
  creatBillPage: I_CreateBillPage = null;
  constructor(
    public util: UtilService,
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router
  ) {
    this.fetchData();
    this.cartService.setDefaultBill();
    this.creatBillPage = { ...this.cartService.createBillPageRef };

    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (
          event instanceof NavigationStart &&
          event.url.startsWith('/tab/createbill')
        ) {
          this.fetchData();
          this.creatBillPage = { ...this.cartService.createBillPageRef };
        }

        if (event instanceof NavigationEnd) {
          // Hide loading indicator
        }

        if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
        }
      }
    );
  }

  ngOnInit() {
    // cartService.mainItems = (itemList as any).default;

    this.activeRoute.queryParams.subscribe((p) => {
      if (p.data) {
        this.creatBillPage = JSON.parse(p.data);
      } else {
        this.creatBillPage = { ...this.cartService.createBillPageRef };
      }
    });
  }
  onModifyItem = (id: string, isIncrease: boolean) => {
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
  };
  onNextScreen = () => {
    this.cartService.createBillPageRef = { ...this.creatBillPage };
    const selectedItem = this.creatBillPage.listOfCartItem.filter(
      (e) => e.count > 0
    );
    if (selectedItem) {
      const query: Params = {
        data: JSON.stringify({
          listItem: selectedItem,
          // customerContact: this.creatBillPage.currentBiill.customerContact,
          // customerName: this.creatBillPage.currentBiill.customerName,
          // gender: this.creatBillPage.currentBiill.gender,
          // due: this.creatBillPage.currentBiill.due,
          // discount: this.creatBillPage.currentBiill.discount,
        }),
      };
      this.router.navigate(['newbill'], {
        relativeTo: this.activeRoute,
        queryParams: query,
      });
    }
  };

  public onReset = () => {};
  onBranchChanged() {
    this.fetchData();
  }
  trackByFn = (inx: number, item: I_CartItem) => item.id;

  private fetchData = () => {
    this.cartService.getAllItem(this.util.branchCode, true, () => {
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
}
