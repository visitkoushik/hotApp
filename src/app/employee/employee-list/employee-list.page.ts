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
import { I_Employee } from 'src/model/employee';
import { ApiEndPoint } from 'src/model/util';

@Component({
  selector: 'app-employee-list',
  templateUrl: 'employee-list.page.html',
  styleUrls: ['employee-list.page.scss'],
})
export class EmployeeListPage implements OnInit {
  public allEmployeies: I_Employee[] = [];
  public EMPLOYEE_READ: boolean = false;
  constructor(
    private utilSrvc: UtilService,
    private activeRoute: ActivatedRoute,
    private snackBar: SnackbarService,
    private httpSrvc: HttpService,
    private router: Router
  ) {
    this.EMPLOYEE_READ =
      this.utilSrvc.metaData.accessRight.findIndex(
        (e) => e === 'EMPLOYEE_READ'
      ) > -1;

    this.router.events.subscribe(
      (event: NavigationStart | NavigationEnd | NavigationError) => {
        if (event instanceof NavigationStart) {
          // this.util.isLoading = true;
          this.fetchAllEmployee();
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
    this.fetchAllEmployee();
  }
  trackByFn = (inx, emp: I_Employee) => emp.userName;

  private fetchAllEmployee = () => {
    this.utilSrvc.isLoading = true;
    this.httpSrvc
      .get(ApiEndPoint.EMPLOYEE_LIST)
      .then((e: AppResponse<I_Employee[]>) => {
        this.allEmployeies = [...e.responseObject];
        this.utilSrvc.isLoading = false;
      })
      .catch((e: AppResponse<any>) => {
        this.utilSrvc.isLoading = false;
        this.snackBar.openSnackBar(e.error.toString());
      });
  };

  onClickEmployee = (emp: I_Employee) => {
    this.router.navigate(['update-employee'], {
      relativeTo: this.activeRoute,
      queryParams: { data: JSON.stringify(emp) },
    });
  };
}
