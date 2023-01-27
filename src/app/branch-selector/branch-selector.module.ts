import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MaterialModule } from '../material.module';
import { PipeModule } from '../pipe/pipe.module';
import { BranchSelectorComponent } from './branch-selector.component';
import { HttpService } from '../providers/http.service';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, MaterialModule, PipeModule],
  declarations: [BranchSelectorComponent],
  exports: [BranchSelectorComponent],
})
export class BranchSelectorModule {}
