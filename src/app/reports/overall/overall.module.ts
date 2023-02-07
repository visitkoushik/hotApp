import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OverallPageRoutingModule } from './overall-routing.module';

import { OverallPage } from './overall.page';
import { MaterialModule } from 'src/app/material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,
    OverallPageRoutingModule
  ],
  declarations: [OverallPage]
})
export class OverallPageModule {}
