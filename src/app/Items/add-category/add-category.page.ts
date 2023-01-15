import { Component, OnInit } from '@angular/core';
import {
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
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
  CATEGORY_READ: boolean = false;
  public categoryList: I_Category[] = [];
  constructor(
    public cartServc: CartService,
    private store: AppStorageService,
    private util: UtilService,
    private httpService: HttpService,
    private snackbar: SnackbarService,
    private router: Router
  ) {
    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          // this.util.isLoading = true;

          this.getCategory();
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

  async ngOnInit() {
    // this.cartServc.categoryList =
    //   (await this.store.getStorage('category').catch((e) => {})) ||
    //   ([] as I_Category[]);
    this.CATEGORY_ADD =
      this.util.metaData.accessRight.findIndex((e) => e === 'CATEGORY_ADD') >
      -1;
    this.CATEGORY_READ =
      this.util.metaData.accessRight.findIndex((e) => e === 'CATEGORY_READ') >
      -1;

    if (this.CATEGORY_READ) {
      this.getCategory();
    }
  }
  getCategory() {
    this.util.isLoading = true;
    this.httpService
      .get(ApiEndPoint.CATEGORY_LIST, 'available=true')
      .then((e: AppResponse<I_Category[]>) => {
        this.categoryList = [...e.responseObject];
        this.util.isLoading = false;
      })
      .catch((e: AppResponse<string>) => {
        this.util.isLoading = false;
        this.snackbar.openSnackBar(e.error);
      });
  }
  isNotValid = (): boolean => this.item.categoryName?.trim().length === 0;
  // onSave_backup = async () => {
  //   this.util.isLoading = true;
  //   if (!this.item.id) {
  //     this.item.id = Date.now() + '';
  //     this.cartServc.categoryList.push({ ...this.item });
  //   } else {
  //     this.cartServc.categoryList = this.cartServc.categoryList.map((e) =>
  //       e.id === this.item.id ? { ...this.item } : e
  //     );
  //   }

  //   const i = {
  //     categoryDiscount: 0,
  //     discountInPercent: false,
  //     available: false,
  //   };
  //   this.item = { ...i } as I_Category;

  //   await this.store.setStorage(StoreName.CATEGORY, [
  //     ...this.cartServc.categoryList,
  //   ]);

  //   this.util.isLoading = false;
  // };

  onSave = () => {
    if (this.item.id) {
      this.updateCategory();
    } else {
      this.addCategory();
    }

  };

  private addCategory = () => {
    this.util.isLoading = true;
    this.httpService
      .post(ApiEndPoint.CATEGORY_ADD, { ...this.item })
      .then((e: AppResponse<I_Category>) => {
        this.util.isLoading = false;
        this.snackbar.openSnackBar('Successfuly Saved');
        this.getCategory();
      })
      .catch((e: AppResponse<I_Category>) => {
        this.snackbar.openSnackBar(e.error);
        this.util.isLoading = false;
      });
  };

  private updateCategory = () => {
    this.util.isLoading = true;
    this.httpService
      .put(ApiEndPoint.CATEGORY_UPDATE, this.item.id, { ...this.item })
      .then((e: AppResponse<I_Category>) => {
        this.util.isLoading = false;
        this.snackbar.openSnackBar('Successfuly Updated');
        this.getCategory();
      })
      .catch((e: AppResponse<I_Category>) => {
        this.snackbar.openSnackBar(e.error);
        this.util.isLoading = false;
      });
  };

  oninputClick = (e) => e.target.select();
  trackByFunction = (c: I_Category) => c.id;
  onClickCategoryItem = (i: I_Category) => {
    this.item = { ...i };
  };
}
