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
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthGaurdService implements CanLoad {
  constructor(private router: Router, private auth: AuthService) {}

  canLoad(
    route: Route
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    const url: string = route.path;
    if (this.auth.isLoggedIn) {
      return true;
    }
    this.auth.redirectUrl = url;
    this.router.navigate(['/login']);
    return false;
  }
}
