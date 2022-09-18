import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemwisePageRoutingModule } from './itemwise-routing.module';

import { ItemwisePage } from './itemwise.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemwisePageRoutingModule
  ],
  declarations: [ItemwisePage]
})
export class ItemwisePageModule {}
