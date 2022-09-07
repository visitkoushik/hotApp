import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Drivers, Storage } from '@ionic/storage';
import { IonicStorageModule } from '@ionic/storage-angular';
import * as SQLiteDriver from 'localforage-cordovasqlitedriver';
import { AppStorageService } from './app-storage.service';


@NgModule({
  declarations: [],
  imports: [
    IonicStorageModule.forRoot({
      name:'___chataDB',
      // eslint-disable-next-line no-underscore-dangle
      driverOrder:[SQLiteDriver._driver, Drivers.IndexedDB, Drivers.LocalStorage]

    }),
    CommonModule,
  ],
  providers:[AppStorageService]
})
export class AppStorageModule { }
