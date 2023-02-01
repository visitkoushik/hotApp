import { Component, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  NavigationError,
  NavigationStart,
  Router,
} from '@angular/router';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Branch } from 'src/model/branch';
import { I_Employee } from 'src/model/employee';
import { ApiEndPoint } from 'src/model/util';

@Component({
  selector: 'app-branch-list',
  templateUrl: './branch-list.page.html',
  styleUrls: ['./branch-list.page.scss'],
})
export class BranchListPage implements OnInit {
  allBranches: I_Branch[] = [];
  public BRANCH_READ: boolean = false;
  public BRANCH_WRITE: boolean = false;
  constructor(
    private utilSrvc: UtilService,
    private activeRoute: ActivatedRoute,
    private snackBar: SnackbarService,
    private httpSrvc: HttpService,
    private router: Router
  ) {
    this.BRANCH_READ =
      this.utilSrvc.metaData.accessRight.findIndex((e) => e === 'BRANCH_READ') >
      -1;
    this.BRANCH_WRITE =
      this.utilSrvc.metaData.accessRight.findIndex(
        (e) => e === 'BRANCH_WRITE'
      ) > -1;

    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (
          event instanceof NavigationStart &&
          event.url.startsWith('/branch-tab/list')
        ) {
          // this.util.isLoading = true;
          this.fetchAll();
        }

        if (event instanceof NavigationEnd) {
          // Hide loading indicator
        }

        if (event instanceof NavigationError) {
          // Hide loading indicator

          // Present error to user
          console.log(event.error);
        }
      }
    );
  }

  ngOnInit() {
    this.fetchAll();
  }

  trackByFn = (inx, brnch: I_Branch) => brnch.code;

  onClick(branch: I_Branch) {
    this.router.navigate(['update-branch'], {
      relativeTo: this.activeRoute,
      queryParams: { data: JSON.stringify(branch) },
    });
  }

  private fetchAll = () => {
    this.httpSrvc
      .fetchBranch()
      .then((e: I_Branch[]) => (this.allBranches = [...e]))
      .catch((e: string) => this.snackBar.openSnackBar(e));
  };

  deleteBranch = (branch: I_Branch) => {
    if (!this.BRANCH_WRITE) {
      return;
    }
    this.utilSrvc.isLoading = true;
    this.httpSrvc
      .delete(ApiEndPoint.BRANCH_DELETE, branch.id)
      .then((e) => {
        this.utilSrvc.isLoading = false;
        this.snackBar.openSnackBar('Branch Deleted');
      })
      .catch((e) => {
        this.utilSrvc.isLoading = false;
        this.snackBar.openSnackBar('Something went wrong');
      });
  };
}
