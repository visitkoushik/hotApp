import { Component, OnInit  } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
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
export class AllBillsPage implements OnInit  {
  public currentDate: Date = null;
  public allBills: I_Bill[] = [];
  public maxDate ;
  constructor(
    private cartService: CartService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private storage: AppStorageService,
    private util: UtilService
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
      this.allBills = [...this.cartService.allBiills];
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
      .then((e) => {
        this.util.isLoading = !true;
        [...this.cartService.allBiills] = [...e];
        this.onChangeDate();
      })
      .catch((e) => {
        this.util.isLoading = !true;
      });
  };


  onChangeDate=()=>{
    this.allBills = [...this.cartService.allBiills].filter(
      (itm) =>
        new Date(itm.billDate).toLocaleDateString() ===
        new Date(this.currentDate).toLocaleDateString()
    );
  };

  trackByFn = (inx, item: I_Bill) => item.billID;

  onPayDue=(e)=>{
    e.stopPropagation();
  };


  setMaxDate = ()=>{
    this.maxDate = new Date();
  };
}
