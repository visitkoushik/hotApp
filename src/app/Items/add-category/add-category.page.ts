import { Component, OnInit } from '@angular/core';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Category } from 'src/model/category';
import { ApiEndPoint, StoreName } from 'src/model/util';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.page.html',
  styleUrls: ['./add-category.page.scss'],
})
export class AddCategoryPage implements OnInit {
  public item: I_Category = {
    categoryName: '',
    id: null,
    categoryDiscount: 0,
    discountInPercent: false,
    available: false,
  } as I_Category;
  CATEGORY_ADD: boolean = false;
  constructor(
    public cartServc: CartService,
    private store: AppStorageService,
    private util: UtilService,
    private httpService: HttpService,
    private snacbar:SnackbarService
  ) {}

  async ngOnInit() {
    // this.cartServc.categoryList =
    //   (await this.store.getStorage('category').catch((e) => {})) ||
    //   ([] as I_Category[]);
    this.CATEGORY_ADD =
      this.util.metaData.accessRight.findIndex((e) => e === 'CATEGORY_ADD') >
      -1;
  }
  isNotValid = (): boolean => this.item.categoryName?.trim().length === 0;
  onSave_backup = async () => {
    this.util.isLoading = true;
    if (!this.item.id) {
      this.item.id = Date.now() + '';
      this.cartServc.categoryList.push({ ...this.item });
    } else {
      this.cartServc.categoryList = this.cartServc.categoryList.map((e) =>
        e.id === this.item.id ? { ...this.item } : e
      );
    }

    const i = {
      categoryDiscount: 0,
      discountInPercent: false,
      available: false,
    };
    this.item = { ...i } as I_Category;

    await this.store.setStorage(StoreName.CATEGORY, [
      ...this.cartServc.categoryList,
    ]);

    this.util.isLoading = false;
  };

  onSave = () => {
    this.util.isLoading = true;
    this.httpService
      .post(ApiEndPoint.CATEGORY_ADD, { ...this.item })
      .then((e: AppResponse<I_Category>) => {
        this.util.isLoading = false;
         this.snacbar.openSnackBar('Successfuly Saved');
      })
      .catch((e: AppResponse<I_Category>) => {
        this.snacbar.openSnackBar(e.error);
        this.util.isLoading = false;
      });
  };

  oninputClick = (e) => e.target.select();
  trackByFunction = (c: I_Category) => c.id;
  onClickCategoryItem = (i: I_Category) => {
    this.item = { ...i };
  };
}
