/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPoint } from 'src/model/util';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  // private baseUrl: string = 'https://hot.cyclic.app/';
  private baseUrl: string = 'http://localhost:8010/';

  constructor(private http: HttpClient) {}

  public get = (api: ApiEndPoint, query?: string): Promise<any> => {
    const _url = this.baseUrl + api;
    return this.http.get(_url).toPromise();
  };

  public post = (api: ApiEndPoint, body): Promise<any> => {
    const _url = this.baseUrl + api;
    return this.http.post(_url, body).toPromise();
  };
}
