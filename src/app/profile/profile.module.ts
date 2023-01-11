import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfilePageRoutingModule } from './profile-routing.module';

import { ProfilePage } from './profile.page';
import { PipeModule } from '../pipe/pipe.module';
import { MaterialModule } from '../material.module';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PipeModule,
    MaterialModule,
    ProfilePageRoutingModule,
  ],
  declarations: [ProfilePage, ChangePasswordComponent],
})
export class ProfilePageModule {}
