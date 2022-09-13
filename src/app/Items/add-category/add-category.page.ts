import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Category } from 'src/model/category';
import { StoreName } from 'src/model/util';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  public item: I_Category = {
    categoryDiscount: 0,
    discountInPercent: false,
    isAvailable: true,
  } as I_Category;
  constructor(
    public cartServc: CartService,
    private store: AppStorageService,
    private util: UtilService
  ) {}

  async ngOnInit() {
    // this.cartServc.categoryList =
    //   (await this.store.getStorage('category').catch((e) => {})) ||
    //   ([] as I_Category[]);
  }
  isNotValid = (): boolean => this.item.categoryName?.trim().length === 0;
  onSave = async () => {
    this.util.isLoading = true;
    if (!this.item.categoryId) {
      this.item.categoryId = Date.now()+ '';
      this.cartServc.categoryList.push({ ...this.item });
    } else {
      this.cartServc.categoryList = this.cartServc.categoryList.map((e) =>
        e.categoryId === this.item.categoryId ? { ...this.item } : e
      );
    }

    const i = {
      categoryDiscount: 0,
      discountInPercent: false,
      isAvailable: true,
    };
    this.item = { ...i } as I_Category;

    await this.store.setStorage(StoreName.CATEGORY, [...this.cartServc.categoryList]);

    this.util.isLoading = false;
  };

  oninputClick = (e) => e.target.select();
  trackByFunction = (c: I_Category) => c.categoryId;

  onClickCategoryItem = (i: I_Category) => {
    this.item = { ...i };
  };
}
