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
import { AppResponse } from 'src/model/AppResponse';
import { I_UserLogin } from 'src/model/userLogin';
import { ApiEndPoint } from 'src/model/util';
import { HttpService } from '../http.service';
import { UtilService } from '../utilservice.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = false;
  private url = '';

  constructor(
    private router: Router,
    private util: UtilService,
    private httpClient: HttpService
  ) {}

  get redirectUrl(): string {
    return this.url;
  }
  set redirectUrl(url: string) {
    this.url = url;
  }

  // public login = (username, passcode): Promise<string> =>
  //   new Promise((resolve, reject) => {
  //     if (
  //       username === this.util.tenantDetail?.username &&
  //       passcode === this.util.tenantDetail?.password
  //     ) {
  //       this.isLoggedIn = true;

  //       resolve('Login success');
  //     } else {
  //       this.isLoggedIn = false;
  //       reject('Login failed');
  //     }
  //   });

  public login = (username, password): Promise<any> => {
    return new Promise((resolve, reject) => {
      this.httpClient
        .post(ApiEndPoint.LOGIN, { username, password })
        .then(async (e: AppResponse<I_UserLogin>) => {
          console.log(e);

          if (e.status == 1) {
            this.util.userLogin = { ...e.responseObject };
            debugger
            await this.httpClient.fetchMetaData();
            this.isLoggedIn = true;
            resolve('Login success');
          }
          reject('Login failed');
        })
        .catch((e) => {

          const apperr: AppResponse<string> = e.error;
          this.isLoggedIn = false;
          reject(apperr.error);
        });
    });
  };
}
