import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ResetPasswordComponent } from 'src/app/employee/update-employee/reset-password/reset-password.component';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { ApiEndPoint } from 'src/model/util';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  public passCode: string = '';
  public repeatPassCode: string = '';
  public oldPassword: string = '';
  userName: string;
  constructor(
    private httpService: HttpService,
    private util: UtilService,
    private snacBar: SnackbarService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>
  ) {}

  ngOnInit() {}

  changePasscod = () => {
    this.httpService
      .post(ApiEndPoint.CHANGEASSWORD, {
        oldPassword: this.oldPassword,
        newPassword: this.passCode,
      })
      .then((e) => {
        this.snacBar.openSnackBar('Passwword changed');
        this.dialogRef.close();
      })
      .catch((e) => {
        this.snacBar.openSnackBar(e.error.error);
      });
  };
  cancel = () => {
    this.dialogRef.close();
  };
}
