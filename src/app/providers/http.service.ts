/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpRespObject } from 'src/model/httpRespModel';
import { ApiEndPoint } from 'src/model/util';
import { UtilService } from './utilservice.service';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // public baseUrl: string = 'https://hot.cyclic.app/';
  public baseUrl: string = 'http://localhost:8010/';

  constructor(private http: HttpClient, private util: UtilService) {}

  public get = (
    api: ApiEndPoint,
    query?: string,
    id?: string
  ): Promise<any> => {
    const idToFetch = id ? '/' + id : '';
    const _url =
      this.baseUrl + api.replace(':id', idToFetch) + (query ? '?' + query : '');
    const headers = new HttpHeaders();
    headers.set('content-type', 'application/json');
    if (this.util.userLogin && this.util.userLogin.authCode) {
      headers.set('auth-code', this.util.userLogin.authCode);
    }
    return this.http.get(_url, this.getCustomHeaders()).toPromise();
  };

  public post = (api: ApiEndPoint, body): Promise<any> => {
    const _url = this.baseUrl + api;

    return this.http.post(_url, body, this.getCustomHeaders()).toPromise();
  };

  public put = (api: ApiEndPoint, id: string, body: any): Promise<any> => {
    const _url = this.baseUrl + api.replace(':id', id);

    return this.http.put(_url, body, this.getCustomHeaders()).toPromise();
  };

  public delete = (api: ApiEndPoint, id: string): Promise<any> => {
    const _url = this.baseUrl + api.replace(':id', id);

    return this.http.delete(_url, this.getCustomHeaders()).toPromise();
  };

  fetchMetaData = async (): Promise<boolean> => {
    this.util.isLoading = true;
    const metadataResp: HttpRespObject = await this.get(ApiEndPoint.METADATA);
    this.util.isLoading = !true;
    if (metadataResp.status == 1) {
      this.util.metaData = metadataResp.responseObject;
      if (
        this.util.metaData.profile &&
        this.util.metaData.profile.branchCode &&
        this.util.metaData.profile.branchCode !== '0'
      ) {
        this.util.branchCode = this.util.metaData.profile.branchCode;
      }
    }

    return new Promise<boolean>((res, rej) => {
      if (this.util.metaData?.ownerNeedtocreate) {
        rej(false);
      } else {
        res(true);
      }
    });
  };

  getCustomHeaders(): any {
    if (this.util.userLogin && this.util.userLogin.authCode) {
      const header = new HttpHeaders()
        .set('content-type', 'application/json')
        .set('auth-code', this.util.userLogin.authCode);
      return { headers: header };
    }
    const header = new HttpHeaders().set('content-type', 'application/json');
    return { headers: header };
  }
}
