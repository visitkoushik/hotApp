import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { I_Category } from 'src/model/category';

@Component({
  selector: 'app-tab-item',
  templateUrl: './tab-item.page.html',
  styleUrls: ['./tab-item.page.scss'],
})
export class TabItemPage implements OnInit {
  constructor(
    private cartServc: CartService,
    private storage: AppStorageService
  ) {}

  async ngOnInit() {
    this.cartServc.categoryList =
      (await this.storage.getStorage('category').catch((e) => {})) ||
      ([] as I_Category[]);
  }
}
