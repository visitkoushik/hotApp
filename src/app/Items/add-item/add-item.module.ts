import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddItemPageRoutingModule } from './add-item-routing.module';

import { AddItemPage } from './add-item.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddItemPageRoutingModule,
    MaterialModule
  ],
  declarations: [AddItemPage]
})
export class AddItemPageModule {}
