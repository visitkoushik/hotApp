import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
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

  constructor(public cartsrvc: CartService, private router: Router) {}

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

  private getItemList=()=>{
    this.cartsrvc.getAllItem(this.includeOutOfStockItem ? null : true, () => {
      this.allItems = this.cartsrvc.mainItems;
    });
  }
}
