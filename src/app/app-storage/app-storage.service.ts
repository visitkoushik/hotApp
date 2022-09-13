/* eslint-disable no-underscore-dangle */
import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import * as SQLiteDriver from 'localforage-cordovasqlitedriver';

@Injectable({
  providedIn: 'root',
})
export class AppStorageService {
  private _storage: Storage | null = null;
  constructor(private storage: Storage) {
    this.init();
  }

  async init() {
    // If using, define drivers here: await this.storage.defineDriver(/*...*/);
    await this.storage.defineDriver(SQLiteDriver);
    const storage = await this.storage.create();
    this._storage = storage;
  }

  public getStorage = async (col: string): Promise<any> => {
    if (!this._storage) {
      await this.init();
    }

    return this._storage.get(col);
  };
  public setStorage = async (col: string, val: any): Promise<any> => {
    if (!this._storage) {
      this.init();
    }

    return this._storage.set(col, val);
  };
}
