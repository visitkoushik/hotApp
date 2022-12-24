import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { CartService } from './providers/cart-service.service';
import { PipeModule } from './pipe/pipe.module';
import { YearPickerComponent } from './custom-mat-picker/year-picker/year-picker.component';
import { SaveService } from './providers/save.service';
import { AuthService } from './providers/auth/auth.service';
import { AppStorageModule } from './app-storage/app-storage.module';
import { PlatformModule } from '@angular/cdk/platform';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    PipeModule,
    AppStorageModule,
    PlatformModule,
    HttpClientModule,
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    CartService,
    SaveService,
    AuthService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
