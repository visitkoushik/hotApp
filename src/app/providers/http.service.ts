/* eslint-disable @typescript-eslint/no-inferrable-types */
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiEndPoint } from 'src/model/util';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  private baseUrl: string = 'https://hot.cyclic.app/';

  constructor(private http: HttpClient) {}

  public get = (api: ApiEndPoint, query?: string): Promise<any> => {
    const _url = this.baseUrl + api;
    return this.http.get(_url).toPromise();
  };
}
