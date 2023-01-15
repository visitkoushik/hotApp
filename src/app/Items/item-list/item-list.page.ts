import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { CartService } from 'src/app/providers/cart-service.service';
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

  constructor(public cartsrvc: CartService, private router: Router) {
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
    this.cartsrvc.getAllItem(this.includeOutOfStockItem ? null : true, () => {
      this.allItems = this.cartsrvc.mainItems;
    });
  };
}
