import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Category } from 'src/model/category';
import { I_Items } from 'src/model/items';
import { StoreName } from 'src/model/util';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  public item: I_Items = {} as I_Items;
  public categoryList: I_Category[] = [] as I_Category[];

  constructor(
    private storage: AppStorageService,
    private snackbar: SnackbarService,
    public cartsrvc: CartService,
    private utisrvc: UtilService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categoryList = this.cartsrvc.categoryList;
    this.activeRoute.queryParams.subscribe((p) => {
      if (p && p.data) {
        this.item = JSON.parse(p.data);
      } else {
        this.setDefault();
      }
    });
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

  onSave = async () => {
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

    this.storage
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
      });
  };

  onChangeItem = (value) => (this.item.category = value);
}
