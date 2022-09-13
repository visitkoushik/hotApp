import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { AppStorageService } from './app-storage/app-storage.service';
import { AuthService } from './providers/auth/auth.service';
import { CartService } from './providers/cart-service.service';
import { SnackbarService } from './providers/snackbar.service';
import { UtilService } from './providers/utilservice.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnChanges {
  pageEvent: any = null;
  isLoggedIn = false;
  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location,
    public auth: AuthService,
    public util: UtilService,
    private storage: AppStorageService,
    private snackbar: SnackbarService,
    private cart: CartService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.storage
      .getStorage('tenant')
      .then((e) => {
        this.util.tenantDetail = { ...e };

        if (
          this.util.tenantDetail?.tan?.trim().length > 0 ||
          this.util.tenantDetail?.pan?.trim().length > 0
        ) {
          this.router.navigateByUrl('/tab');
        }
      })
      .catch((e) => {
        this.snackbar.openSnackBar('Please set Tenant detail');
      });

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
    this.auth.isLoggedIn = false;
    this.auth.redirectUrl = '';
  };
}
