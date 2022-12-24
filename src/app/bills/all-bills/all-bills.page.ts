import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AlertService } from 'src/app/providers/alert.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { I_Bill } from 'src/model/bill';
import { ClassBill } from 'src/model/billClass';
import { StoreName } from 'src/model/util';
import { AppStorageService } from '../../app-storage/app-storage.service';
import { CartService } from '../../providers/cart-service.service';
import { UtilService } from '../../providers/utilservice.service';

@Component({
  selector: 'app-all-bills',
  templateUrl: './all-bills.page.html',
  styleUrls: ['./all-bills.page.scss'],
})
export class AllBillsPage implements OnInit {
  public currentDate: Date = null;
  public allBills: I_Bill[] = [];
  public maxDate;
  constructor(
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private storage: AppStorageService,
    private util: UtilService,
    private alrtCtrl: AlertController,
    private alertSrvc: AlertService,
    private snackbar: SnackbarService
  ) {
    this.currentDate = new Date();

    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          this.util.isLoading = true;
          this.setMaxDate();
          this.fetchBills();
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
    this.setMaxDate();
    this.fetchBills();
    this.activeRoute.queryParams.subscribe((p) => {
      // this.allBills = [...this.cartService.allBiills];
      this.allBills = [...this.cartService.allBiills].filter(
        (itm) => itm.status
      );
    });
  }

  onClickItemBill = (billItem: I_Bill) => {
    this.router.navigate(['existingbill'], {
      relativeTo: this.activeRoute,
      queryParams: { data: JSON.stringify(billItem) },
    });
  };

  fetchBills = () => {
    this.storage
      .getStorage(StoreName.BILL)
      .then(async (e) => {
        this.util.isLoading = !true;
        [...this.cartService.allBiills] = [...e];

       this.allBills =  await this.updateBills();
      })
      .catch((e) => {
        this.util.isLoading = !true;
      });
  };

  updateBills = (): Promise<I_Bill[]> =>
    new Promise((res) => {

      const allBills = [...this.cartService.allBiills]?.filter(
        (itm) =>itm.status &&
          new Date(itm.billDate).toLocaleDateString() ===
            new Date(this.currentDate).toLocaleDateString()
      );
      res(allBills || []);
    });

  onChangeDate = async () => {
    this.allBills = await this.updateBills();
  };

  trackByFn = (inx, item: I_Bill) => item.billID;

  onPayDue = (e, bill: I_Bill) => {
    e.stopPropagation();
    this.presentAlert(bill);
  };

  onDelete = (e, bill: I_Bill) => {
    e.stopPropagation();
    this.alertSrvc.presentAlert(
      this.alrtCtrl,
      'Confirm Delete',
      'Are you sure, you want to delete the bill? ',
      { ok: 'Yes', cancel: 'No' },
      async () => {
        // eslint-disable-next-line no-underscore-dangle

        this.cartService.allBiills = this.cartService.allBiills.map(
          (b: I_Bill) =>
            b.billID === bill.billID ? { ...b, status: false } : b
        );

        await this.storage.setStorage(StoreName.BILL, [
          ...this.cartService.allBiills,
        ]);
       this.allBills = await this.updateBills();
      },
      () => {}
    );
  };
  setMaxDate = () => {
    this.maxDate = new Date();
  };

  yesHandler = async (bill: I_Bill, dueInput: string) => {
    if (!dueInput || +dueInput <= 0 || bill.due < +dueInput) {
      if (!dueInput || +dueInput >= bill.due) {
        this.snackbar.openSnackBar(
          'Input amount cannot be greater than due amount'
        );
      } else {
        this.snackbar.openSnackBar('Enter amount atleast 1 Rs.');
      }

      return false;
    }
    this.allBills = this.allBills.map((e) =>
      e.billID === bill.billID
        ? { ...e, due: e.total - e.paid - +dueInput, paid: e.paid + +dueInput }
        : e
    );

    this.cartService.allBiills = [...this.allBills];
    await this.storage
      .setStorage(StoreName.BILL, [...this.cartService.allBiills])
      .catch((err) => this.snackbar.openSnackBar('Error update data'));
  };

  noHandler = () => {};

  async presentAlert(bill: I_Bill) {
    const alert = await this.alrtCtrl.create({
      header: 'Please enter amount',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',

          handler: () => this.noHandler(),
        },
        {
          text: 'OK',

          handler: (data) => this.yesHandler(bill, data.dueInput),
        },
      ],
      inputs: [
        {
          name: 'dueInput',
          type: 'number',
          placeholder: 'Due amount',
          min: 1,
          max: bill.due,
        },
      ],
    });

    await alert.present();
  }
}
