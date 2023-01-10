import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { async } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Category } from 'src/model/category';
import { I_Items } from 'src/model/items';
import { ApiEndPoint, StoreName } from 'src/model/util';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  public item: I_Items = {} as I_Items;
  public categoryList: I_Category[] = [] as I_Category[];
  public ITEM_ADD: boolean = false;
  public ITEM_UPDATE: boolean = false;
  public ITEM_READ: boolean = false;
  public CATEGORY_READ: boolean = false;

  constructor(
    private storage: AppStorageService,
    private snackbar: SnackbarService,
    public cartsrvc: CartService,
    private utisrvc: UtilService,
    private activeRoute: ActivatedRoute,
    private httpClient: HttpService
  ) {}

  ngOnInit() {
    this.ITEM_ADD =
      this.utisrvc.metaData.accessRight.findIndex((e) => e === 'ITEM_ADD') > -1;
    this.ITEM_UPDATE =
      this.utisrvc.metaData.accessRight.findIndex((e) => e === 'ITEM_UPDATE') >
      -1;
    this.ITEM_READ =
      this.utisrvc.metaData.accessRight.findIndex((e) => e === 'ITEM_READ') >
      -1;
    this.CATEGORY_READ =
      this.utisrvc.metaData.accessRight.findIndex(
        (e) => e === 'CATEGORY_READ'
      ) > -1;
    if (this.ITEM_ADD) {
      this.setDefault();

      if (this.CATEGORY_READ) {
        this.getCategory();
      }

      this.activeRoute.queryParams.subscribe((p) => {
        if (p && p.data) {
          this.item = JSON.parse(p.data);
        } else {
          this.setDefault();
        }
      });
    }
  }
  oninputClick = (e) => e.target.select();
  setDefault = () => {
    this.item = {
      category: '-1',
      id: null,
      itemName: '',
      itemPrice: { priceAmount: 0, sellingAmount: 0 },
      discount: 0,
      isDiscountInPercentage: false,
      available: true,
    } as I_Items;
  };

  isNotValid = (): boolean =>
    this.item.itemPrice.priceAmount === 0 ||
    this.item.itemPrice.sellingAmount === 0 ||
    this.item?.itemName?.trim().length === 0 ||
    !this.item.category ||
    this.item.category === '-1';

  onSave_LoclStore = async () => {
    let allreadySavedItems: I_Items[] = [] as I_Items[];
    let newSavedItems: I_Items[] = [] as I_Items[];
    this.utisrvc.isLoading = true;

    //Get Already Saved Item or blank array

    allreadySavedItems =
      (await this.storage.getStorage(StoreName.ITEM).catch((e) => {
        this.utisrvc.isLoading = false;
        this.snackbar.openSnackBar('Error on Exiting item');
      })) || [];

    if (
      allreadySavedItems.findIndex(
        (e) => this.item.id && e.id === this.item.id
      ) === -1
    ) {
      //Check if the saved Item list has item with the specific id
      this.item = { ...this.item };
      newSavedItems = [...allreadySavedItems, this.item];
    } else {
      newSavedItems = allreadySavedItems.map((e) =>
        this.item.id && e.id === this.item.id ? this.item : e
      );
    }

    /*this.storage
      .setStorage(StoreName.ITEM, newSavedItems)
      .then((e) => {
        this.utisrvc.isLoading = false;
        this.snackbar.openSnackBar('Item Saved');
        this.cartsrvc.mainItems = [...newSavedItems];
        if (
          !this.cartsrvc.createBillPageRef ||
          !this.cartsrvc.createBillPageRef.currentBiill
        ) {
          this.cartsrvc.setDefaultBill();
        } else {
          this.cartsrvc.updateDefaultBill();
        }
        this.setDefault();
      })
      .catch((e) => {
        this.utisrvc.isLoading = false;
        this.snackbar.openSnackBar('Error on item Saved ');
      });*/
  };
  onChangeItem = (value) => (this.item.category = value);
  onSave = async () => {
    let newSavedItems: I_Items = { ...this.item };
    if (newSavedItems.id) {
      this.updateItem();
    } else {
      this.addItem();
    }
  };

  private addItem = () => {
    this.utisrvc.isLoading = true;
    this.httpClient
      .post(ApiEndPoint.ITEM_ADD, { ...this.item })
      .then((e: AppResponse<I_Items>) => {
        const newSavedItems = e.responseObject;
        this.cartsrvc.mainItems = [...this.cartsrvc.mainItems, newSavedItems];
        this.snackbar.openSnackBar('Successfuly Saved');
        this.setDefault();
        this.utisrvc.isLoading = false;
      })
      .catch((e: AppResponse<I_Items>) => {
        this.snackbar.openSnackBar(e.error);
        this.setDefault();
        this.utisrvc.isLoading = false;
      });
  };
  private updateItem = () => {
    this.utisrvc.isLoading = true;
    this.httpClient
      .put(ApiEndPoint.ITEM_UPDATE, this.item.id, {
        ...this.item,
        category:
          typeof this.item.category !== 'string'
            ? this.item.category.id
            : this.item.category,
      })
      .then((e: AppResponse<I_Items>) => {
        const newSavedItems = e.responseObject;
        this.cartsrvc.mainItems = this.cartsrvc.mainItems.map((e: I_Items) =>
          e.id === newSavedItems.id ? newSavedItems : e
        );
        this.snackbar.openSnackBar('Successfuly updated');
        this.setDefault();
        this.utisrvc.isLoading = false;
      })
      .catch((e: AppResponse<I_Items>) => {
        this.snackbar.openSnackBar(e.error);
        this.setDefault();
        this.utisrvc.isLoading = false;
      });
  };

  getCategory() {
    this.utisrvc.isLoading = true;
    this.httpClient
      .get(ApiEndPoint.CATEGORY_LIST, 'available=true')
      .then((e: AppResponse<I_Category[]>) => {
        this.utisrvc.isLoading = false;
        this.categoryList = e.responseObject;
      })
      .catch((e: AppResponse<string>) => {
        this.utisrvc.isLoading = false;
        this.snackbar.openSnackBar(e.error);
      });
  }
}
