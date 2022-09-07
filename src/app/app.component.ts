import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, mergeMap, tap } from 'rxjs/operators';
import { AppStorageService } from './app-storage/app-storage.service';
import { AuthService } from './providers/auth/auth.service';
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
    private store: AppStorageService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
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
