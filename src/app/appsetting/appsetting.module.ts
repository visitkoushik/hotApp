import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AppsettingPageRoutingModule } from './appsetting-routing.module';

import { AppsettingPage } from './appsetting.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AppsettingPageRoutingModule
  ],
  declarations: [AppsettingPage]
})
export class AppsettingPageModule {}
