// import { Injectable } from '@angular/core';
// import {
//   ActivatedRoute,
//   CanLoad,
//   Route,
//   Router,
//   UrlSegment,
//   UrlTree,
// } from '@angular/router';
// import { Observable } from 'rxjs';
// import { AppStorageService } from 'src/app/app-storage/app-storage.service';
// import { HttpRespObject } from 'src/model/httpRespModel';
// import { ApiEndPoint, StoreName } from 'src/model/util';
// import { HttpService } from './http.service';
// import { UtilService } from './utilservice.service';
// @Injectable({
//   providedIn: 'root',
// })
// export class MenuGaurdService implements CanLoad {
//   constructor(
//     private router: Router,
//     private storage: AppStorageService,
//     private util: UtilService,
//     private httpClient: HttpService
//   ) {}

//   canLoad(
//     route: Route
//   ):
//     | boolean
//     | UrlTree
//     | Observable<boolean | UrlTree>
//     | Promise<boolean | UrlTree> {
//     const url: string = route.path;
//   }

//   fetchMetaData = async (): Promise<boolean> => {
//     this.util.isLoading = true;
//     this.util.metaData = null;
//     const metadataResp: HttpRespObject = await this.httpClient.get(
//       ApiEndPoint.METADATA
//     );
//     this.util.isLoading = false;
//     if (metadataResp.status == 1) {
//       this.util.metaData = metadataResp.responseObject;
//     }

//     return new Promise<boolean>((res, rej) => {
//       if (this.util.metaData?.ownerNeedtocreate) {
//         rej(false);
//       } else {
//         res(true);
//       }
//     });
//   };
// }
