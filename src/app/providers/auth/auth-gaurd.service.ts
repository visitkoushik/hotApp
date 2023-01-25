import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  CanLoad,
  Route,
  Router,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { HttpRespObject } from 'src/model/httpRespModel';
import { ApiEndPoint, StoreName } from 'src/model/util';
import { HttpService } from '../http.service';
import { UtilService } from '../utilservice.service';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanLoad {
  constructor(
    private router: Router,
    private auth: AuthService,
    private storage: AppStorageService,
    private util: UtilService,
    private httpClient: HttpService
  ) {}

  canLoad(
    route: Route
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const url: string = route.path;
    if (this.util.isLoggedIn) {
      if(!this.util.metaData){
        this.fetchMetaData()
      }
      return true;
    }
    return new Promise((res, rej) => {
      this.storage
        .getStorage(StoreName.LOGIN)
        .then(async (e) => {
          this.util.userLogin = e.userLogin;
          this.util.isLoggedIn = e.isLoggedIn;
          if (!this.util.isLoggedIn) {
            this.util.redirectUrl = url;
            this.router.navigate(['/login']);
          } else {
            await this.fetchMetaData();
          }
          res(this.util.isLoggedIn);

        })
        .catch((e) => {
          this.util.userLogin = null;
          this.util.isLoggedIn = false;

          this.util.redirectUrl = url;
          this.router.navigate(['/login']);
          res(this.util.isLoggedIn);
        });
    });
  }

  fetchMetaData = async (): Promise<boolean> => {
    this.util.isLoading = true;
    this.util.metaData = null;
    const metadataResp: boolean = await this.httpClient.fetchMetaData();
    this.util.isLoading = false;


    return new Promise<boolean>((res, rej) => {
      if (!metadataResp || this.util.metaData?.ownerNeedtocreate) {
        rej(false);
      } else {
        res(true);
      }
    });
  };
}
