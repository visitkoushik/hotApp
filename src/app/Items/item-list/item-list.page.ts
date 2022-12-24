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
  constructor(public cartsrvc: CartService, private router: Router) {}

  ngOnInit() {}
  trackByFn = (inx, item: I_Items) => item.id;

  onModifyItem = (item: I_Items) => {
    this.router.navigate(['/tab-item/add-item'], {
      queryParams: { data: JSON.stringify(item) },
    });
  };
}
