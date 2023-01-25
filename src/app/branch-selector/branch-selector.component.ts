import { Component, OnInit } from '@angular/core';
import { I_Branch } from 'src/model/branch';
import { HttpService } from '../providers/http.service';
import { UtilService } from '../providers/utilservice.service';

@Component({
  selector: 'app-branch-selector',
  templateUrl: './branch-selector.component.html',
  styleUrls: ['./branch-selector.component.scss'],
})
export class BranchSelectorComponent implements OnInit {
  onBranchChange(ev) {
    this.util.branchCode = ev.trget?.value || '0';
  }

  constructor(private httpService: HttpService, public util: UtilService) {}

  ngOnInit() {
    if (!this.util.allBranches || this.util.allBranches?.length === 0) {
      this.httpService
        .fetchBranch()
        .then((e) => {})
        .catch((e) => {});
    }
  }
}
