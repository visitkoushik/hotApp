import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { I_Branch } from 'src/model/branch';
import { HttpService } from '../providers/http.service';
import { UtilService } from '../providers/utilservice.service';

@Component({
  selector: 'app-branch-selector',
  templateUrl: './branch-selector.component.html',
  styleUrls: ['./branch-selector.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi:true,
      useExisting: BranchSelectorComponent
    }
  ]
})
export class BranchSelectorComponent implements OnInit, ControlValueAccessor {
  @Output() branchChanged = new EventEmitter<string>();


  onChange= (value:string) => {};
  touched = false;

  disabled = false;


  onBranchChange(ev) {
    this.branchChanged.emit(this.util.branchCode);
  }

  constructor(private httpService: HttpService, public util: UtilService) {}
  writeValue(obj: any): void {
    this.util.branchCode =obj;
  }
  registerOnChange(fn: any): void {
   this.onChange = fn;
   this.touched=true;
  }
  registerOnTouched(fn: any): void {

  }
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  ngOnInit() {
    this.util.branchCode = this.util.branchCode || '0';
    if (!this.util.allBranches || this.util.allBranches?.length === 0) {
      this.httpService
        .fetchBranch()
        .then((e) => {})
        .catch((e) => {});
    }
  }
}
