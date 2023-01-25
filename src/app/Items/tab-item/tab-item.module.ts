import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabItemPageRoutingModule } from './tab-item-routing.module';

import { TabItemPage } from './tab-item.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabItemPageRoutingModule,
    MaterialModule
  ],
  declarations: [TabItemPage],
})
export class TabItemPageModule {}
