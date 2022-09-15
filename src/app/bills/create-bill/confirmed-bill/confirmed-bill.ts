import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { AlertService } from 'src/app/providers/alert.service';
import { CartService } from 'src/app/providers/cart-service.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Bill } from 'src/model/bill';
import { ClassBill, I_Print } from 'src/model/billClass';
import { StoreName } from 'src/model/util';

@Component({
  templateUrl: './confirmed-bill.html',
  styleUrls: ['./confiremd-bill.scss'],
})
export class ConfiremdBillPage implements OnInit {
  public currentBillPrintStr: string = null;
  public currentBillPrint: I_Print = null;
  public currentBill: I_Bill;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private cartService: CartService,
    private storeage: AppStorageService,
    private util: UtilService,
    private snack: SnackbarService,
    private alertServc: AlertService,
    private altrCtrl: AlertController
  ) {}

  ngOnInit(): void {
    this.activeRoute.queryParams.subscribe((p) => {
      this.currentBillPrintStr = p.data;
      this.currentBillPrint = JSON.parse(p.data);
      this.currentBill=this.cartService.createBillPageRef.currentBiill;

    });
  }

  onDone = () => {
    this.alertServc.presentAlert(
      this.altrCtrl,
      'Confirm',
      'Are you sure, you want to confirm the bill?',
      { ok: 'Yes', cancel: 'No' },
      () => {
        // eslint-disable-next-line no-underscore-dangle
        this.done();
      },
      ()=>{

      }
    );
  };

  done = async () => {
    this.util.isLoading = true;
    const allbills = [...this.cartService.allBiills];
    allbills.push({
      ...this.cartService.createBillPageRef.currentBiill,
      status: true,
    });

    const dt = new Date();
    const key = `${dt.getDay()}-${dt.getMonth()}-${dt.getFullYear()}`;
    await this.storeage.setStorage(StoreName.ORDER, {
      key,
      order: this.cartService.globalOrderNumber,
    });

    this.storeage
      .setStorage(StoreName.BILL, allbills)
      .then((e) => {
        this.snack.openSnackBar('Bill created');
        this.cartService.allBiills.push({
          ...this.cartService.createBillPageRef.currentBiill,
          status: true,
        });
        this.cartService.allBiills = [...allbills];
        this.cartService.setDefaultBill();
        this.router.navigateByUrl('/tab/createbill');
        this.util.isLoading = false;
      })
      .catch((ex) => {
        this.util.isLoading = false;
      });
  };

  onChangePaid=()=>{
    this.cartService.createBillPageRef.currentBiill.paid =
    this.currentBill.paid;
    this.cartService.createBillPageRef.currentBiill.due = this.currentBill.total - this.currentBill.paid;
  };
}
