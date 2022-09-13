import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { StoreName } from 'src/model/util';
import { UtilService } from '../utilservice.service';
import { CompanyService } from './company.service';

@Injectable({
  providedIn: 'root',
})
export class TanGaurdService implements CanLoad {
  constructor(
    private utilsrvc: UtilService,
    private comp: CompanyService,
    private router: Router,
    private store: AppStorageService
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    // const url: string = route.path;
    // if (
    //   this.utilsrvc.tenantDetail?.tan?.trim().length > 0 ||
    //   this.utilsrvc.tenantDetail?.pan?.trim().length > 0
    // ) {
    //   return true;
    // }
    // this.comp.redirectUrl = url;
    // this.router.navigate(['/configure']);
    // return false;
    return new Promise<boolean>((res, rej) => {
      this.store
        .getStorage(StoreName.TENANT)
        .then((e) => {
          this.utilsrvc.tenantDetail = { ...e };
          if (
            this.utilsrvc.tenantDetail?.tan?.trim().length > 0 ||
            this.utilsrvc.tenantDetail?.pan?.trim().length > 0
          ) {
            res(true);
          } else {
            this.onfail();
            rej(false);
          }
        })
        .catch((e) => {
          this.onfail();
          rej(false);
        });
    });
  }

  onfail = () => {
    this.router.navigate(['/configure']);
  };
}
