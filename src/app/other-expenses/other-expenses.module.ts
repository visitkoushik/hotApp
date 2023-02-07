import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OtherExpensesPageRoutingModule } from './other-expenses-routing.module';

import { OtherExpensesPage } from './other-expenses.page';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MaterialModule,

    OtherExpensesPageRoutingModule,
  ],
  declarations: [OtherExpensesPage],
})
export class OtherExpensesPageModule {}
