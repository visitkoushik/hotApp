import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ItemwisePageRoutingModule } from './itemwise-routing.module';

import { ItemwisePage } from './itemwise.page';
import { PipeModule } from 'src/app/pipe/pipe.module';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ItemwisePageRoutingModule,
    PipeModule,
    MaterialModule,

    ReactiveFormsModule,
  ],
  declarations: [ItemwisePage]
})
export class ItemwisePageModule {}
