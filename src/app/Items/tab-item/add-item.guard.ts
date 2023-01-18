import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AddItemPage } from '../add-item/add-item.page';

@Injectable()
export class AddItemDisplayGuard
  implements CanActivate, CanDeactivate<AddItemPage>
{
  canActivate() {
    //Your redirect logic/condition. I use this.

    return (
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_ADD') > -1
    );
  }
  canDeactivate(
    component: AddItemPage,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return (
      this.util.metaData.accessRight.findIndex((e) => e === 'ITEM_ADD') > -1
    );
  }
  //Constructor
  constructor(private router: Router, private util: UtilService) {}
}
