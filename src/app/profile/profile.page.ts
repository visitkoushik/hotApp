import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AppResponse } from 'src/model/AppResponse';
import { I_Profile } from 'src/model/Profile';
import { ApiEndPoint } from 'src/model/util';
import { HttpService } from '../providers/http.service';
import { SnackbarService } from '../providers/snackbar.service';
import { UtilService } from '../providers/utilservice.service';
import { ChangePasswordComponent } from './change-password/change-password.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  public profile: I_Profile = {} as I_Profile;
  constructor(
    public utilsrvc: UtilService,
    private httpClient: HttpService,
    private snackBar: SnackbarService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.utilsrvc.isLoading = true;
    this.httpClient
      .get(ApiEndPoint.EMPLOYEE_PROFILE)
      .then((e: AppResponse<I_Profile>) => {
        this.profile = { ...e.responseObject };
        this.utilsrvc.metaData.profile = { ...this.profile };
        this.utilsrvc.isLoading = false;
      })
      .catch((e: AppResponse<any>) => {
        this.snackBar.openSnackBar(e.error);
        this.utilsrvc.isLoading = false;
      });
  }

  onChangePassCode = () => {
    this.openDialog();
  };

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }
}
