import { Injectable } from '@angular/core';
import { CanLoad, Route, Router, UrlSegment, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AppStorageService } from 'src/app/app-storage/app-storage.service';
import { HttpRespObject } from 'src/model/httpRespModel';
import { ApiEndPoint, StoreName } from 'src/model/util';
import { HttpService } from '../providers/http.service';
import { UtilService } from '../providers/utilservice.service';

@Injectable({
  providedIn: 'root',
})
export class OwnerGaurdService implements CanLoad {
  constructor(
    private utilsrvc: UtilService,
    private httpClient: HttpService,
    private router: Router
  ) {}
  canLoad(
    route: Route,
    segments: UrlSegment[]
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return this.fetchMetaData();
  }

  onfail = () => {
    this.router.navigate(['/employee']);
  };

  fetchMetaData = async (): Promise<boolean> => {
    this.utilsrvc.isLoading = true;
    const metadataResp: HttpRespObject = await this.httpClient.get(
      ApiEndPoint.METADATA
    );
    this.utilsrvc.isLoading = !true;
    if (metadataResp.status == 1) {
      this.utilsrvc.metaData = metadataResp.responseObject;
    }

    return new Promise<boolean>((res, rej) => {
      if (this.utilsrvc.metaData?.ownerNeedtocreate) {
        this.onfail();
        rej(false);
      } else {
        res(true);
      }
    });
  };
}
