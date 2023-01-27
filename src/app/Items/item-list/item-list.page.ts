import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { CartService } from 'src/app/providers/cart-service.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Items } from 'src/model/items';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.page.html',
  styleUrls: ['./item-list.page.scss'],
})
export class ItemListPage implements OnInit {
  public filterTerm = '';
  public includeOutOfStockItem: boolean = false;

  public allItems: I_Items[] = [];
  ITEM_ADD: boolean;
  ITEM_UPDATE: boolean;
  ITEM_READ: boolean;
  CATEGORY_READ: boolean;

  constructor(
    public util: UtilService,
    public cartsrvc: CartService,
    private router: Router,
  ) {
    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          // this.util.isLoading = true;

          this.getItemList();
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
    this.ITEM_ADD =
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_ADD') > -1;
    this.ITEM_UPDATE =
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_UPDATE') > -1;
    this.ITEM_READ =
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_READ') > -1;

    this.getItemList();
  }
  trackByFn = (inx, item: I_Items) => item.id;

  onModifyItem = (item: I_Items) => {
    this.router.navigate(['/tab-item/add-item'], {
      queryParams: { data: JSON.stringify(item) },
    });
  };
  onChangeIncludeStock = (event) => {
    this.getItemList();
  };

  private getItemList = () => {
    this.cartsrvc.getAllItem(this.util.branchCode, this.includeOutOfStockItem ? null : true, () => {
      this.allItems = this.cartsrvc.mainItems;
    });
  };

  onBranchChanged=()=>{
    this.getItemList();
  }
}
