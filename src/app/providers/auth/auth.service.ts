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
import { AppResponse } from 'src/model/AppResponse';
import { I_UserLogin } from 'src/model/userLogin';
import { ApiEndPoint, StoreName } from 'src/model/util';
import { HttpService } from '../http.service';
import { UtilService } from '../utilservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {



  constructor(
    private router: Router,
    private util: UtilService,
    private httpClient: HttpService,
    private storage: AppStorageService
  ) {}


  public login = (username, password): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(ApiEndPoint.LOGIN, { username, password })
        .then(async (e: AppResponse<I_UserLogin>) => {
          console.log(e);

          if (e.status == 1) {
            this.util.userLogin = { ...e.responseObject };
            this.util.isLoggedIn = true;
            await this.storage.setStorage(StoreName.LOGIN, {
              userLogin: { ...e.responseObject },
              isLoggedIn: this.util.isLoggedIn,
            });
            await this.httpClient.fetchMetaData();
            resolve('Login success');
          }
          reject('Login failed');
        })
        .catch((e) => {
          const apperr: AppResponse<string> = e.error;
          this.util.isLoggedIn = false;
          reject(apperr.error);
        });
    });
  };
}
