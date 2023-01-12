import { Location } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { HttpRespObject } from 'src/model/httpRespModel';
import { I_MetaData } from 'src/model/metadata';
import { ApiEndPoint, StoreName } from 'src/model/util';
import { AppStorageService } from './app-storage/app-storage.service';
import { AuthService } from './providers/auth/auth.service';
import { CartService } from './providers/cart-service.service';
import { HttpService } from './providers/http.service';
import { SnackbarService } from './providers/snackbar.service';
import { ThemeService } from './providers/theme.service';
import { UtilService } from './providers/utilservice.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  pageEvent: any = null;
  isLoggedIn = false;
  metaData: I_MetaData = null;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public auth: AuthService,
    public util: UtilService,
    private storage: AppStorageService,
    private snackbar: SnackbarService,
    private cart: CartService,
    private theme: ThemeService,
    private platform: Platform,
    private httpClient: HttpService
  ) {
    this.platform
      .ready()
      .then((e) => {
        this.platform.backButton.subscribeWithPriority(9999, () => {
          document.addEventListener(
            'backbutton',
            (event) => {
              event.preventDefault();
              event.stopPropagation();
            },
            false
          );
        });
      })
      .catch((e) => {});
  }
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.metaData = this.util.metaData;
    this.theme.activeTheme('default');
    // this.fetchMetaData();
    this.fetchTenantInfo();
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => this.activatedRoute),
        map((route) => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        }),
        filter((route) => route.outlet === 'primary'),
        mergeMap((route) => route.data)
      )
      .subscribe((event) => {
        this.pageEvent = event;
      });
  }
  onBack = () => {
    if (this.pageEvent.backTo) {
      this.router.navigateByUrl(`/${this.pageEvent.backTo}`);
    } else {
      this.location.back();
    }
  };
  appLogout = () => {
    // this.auth.isLoggedIn = false;
    // this.auth.redirectUrl = '';
    this.util.isLoading = true;

    this.httpClient
      .post(ApiEndPoint.LOGOUT, {})
      .then((e) => {
        this.util.isLoading = false;
        this.isLoggedIn = false;
        this.router.navigate(['/login']);
      })
      .catch((e) => {
        this.util.isLoading = false;
      });
  };

  fetchBills = () => {
    this.storage
      .getStorage(StoreName.BILL)
      .then((e) => {
        this.util.isLoading = !true;
        [...this.cart.allBiills] = [...e];
      })
      .catch((e) => {
        this.util.isLoading = !true;
      });
  };

  fetchTenantInfo = () => {
    this.util.isLoading = true;
    this.storage
      .getStorage(StoreName.TENANT)
      .then(async (e) => {
        this.util.tenantDetail = { ...e };
        await this.fetchBills();
        this.util.isLoading = true;
        if (
          this.util.tenantDetail?.tan?.trim().length > 0 ||
          this.util.tenantDetail?.pan?.trim().length > 0
        ) {
          this.router.navigateByUrl('/tab');
        }
      })
      .catch((e) => {
        this.util.isLoading = true;
        this.snackbar.openSnackBar('Please set Tenant detail');
      });
  };
}
