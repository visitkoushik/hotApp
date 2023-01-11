import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlertService } from 'src/app/providers/alert.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { ApiEndPoint } from 'src/model/util';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit {
  @Output() onSave = new EventEmitter<any>();
  @Output() onCancel = new EventEmitter<any>();
  public passCode: string = '';
  public repeatPassCode: string = '';
  userName: string;
  constructor(
    private httpService: HttpService,
    private util: UtilService,
    private snacBar: SnackbarService,
    private dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.userName = data.userName;
  }

  ngOnInit() {}

  resetPasscod = () => {
    this.httpService
      .post(ApiEndPoint.RESETPASSWORD, {
        userName: this.userName,
        newPassword: this.passCode,
      })
      .then((e) => {
        this.snacBar.openSnackBar('Passwword changed');
        this.dialogRef.close();
        this.onSave.emit({ password: this.passCode, status: 'Passwword changed' });
      })
      .catch((e) => this.snacBar.openSnackBar(e.error.error));

  };
  cancel = () => {
    this.dialogRef.close();
    this.onCancel.emit({ status: 'Action canceled' });
  };
}
