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
import { I_Items } from 'src/model/items';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.page.html',
  styleUrls: ['./add-item.page.scss'],
})
export class AddItemPage implements OnInit {
  public item: I_Items = null;

  constructor(
    private storage: AppStorageService,
    private snackbar: SnackbarService,
    private cartsrvc: CartService,
    private utisrvc: UtilService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((p) => {
      if (p && p.data) {
        this.item = JSON.parse(p.data);
      } else {
        this.setDefault();
      }
    });
  }

  setDefault = () => {
    this.item = {
      itemId: null,
      itemName: '',
      itemPurchaseValue: 0,
      itemSellDiscount: 0,
      itemSellValue: 0,
      discountInPercent: false,
      isAvailable: true,
    } as I_Items;
  };

  isNotValid = (): boolean =>
    this.item.itemPurchaseValue === 0 ||
    this.item.itemSellValue === 0 ||
    this.item.itemName.trim().length === 0;

  onSave = async () => {
    let allreadySavedItems: I_Items[] = [] as I_Items[];
    let newSavedItems: I_Items[] = [] as I_Items[];
    this.utisrvc.isLoading = true;

    //Get Already Saved Item or blank array

    allreadySavedItems =
      (await this.storage.getStorage('items').catch((e) => {
        this.utisrvc.isLoading = false;
        this.snackbar.openSnackBar('Error on Exiting item');
      })) || [];

    if (
      allreadySavedItems.findIndex(
        (e) => this.item.itemId && e.itemId === this.item.itemId
      ) === -1
    ) {
      //Check if the saved Item list has item with the specific id
      this.item = { ...this.item, itemId: `${Date.now()}` };
      newSavedItems = [...allreadySavedItems, this.item];
    } else {
      newSavedItems = allreadySavedItems.map((e) =>
        this.item.itemId && e.itemId === this.item.itemId ? this.item : e
      );
    }

    this.storage
      .setStorage('items', newSavedItems)
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
}
