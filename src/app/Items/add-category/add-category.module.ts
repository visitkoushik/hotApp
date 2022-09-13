import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddCategoryPageRoutingModule } from './add-category-routing.module';

import { AddCategoryPage } from './add-category.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddCategoryPageRoutingModule,
    MaterialModule
  ],
  declarations: [AddCategoryPage]
})
export class AddCategoryPageModule {}
