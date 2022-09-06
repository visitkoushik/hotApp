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

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public isLoggedIn = false;
  private url = '';

  constructor(private router: Router) {}

  get redirectUrl(): string {
    return this.url;
  }
  set redirectUrl(url: string) {
    this.url = url;
  }

  public login = (username, passcode): Promise<string> =>
    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (username === 'houseoftea' && passcode === 'janina') {
          this.isLoggedIn = true;

          resolve('Login success');
        } else {
          this.isLoggedIn = false;
          reject('Login failed');
        }
      }, 15000);
    });
}
