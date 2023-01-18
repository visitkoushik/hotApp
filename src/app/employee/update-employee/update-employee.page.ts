import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { I_Employee } from 'src/model/employee';
import { HttpRespObject } from 'src/model/httpRespModel';
import { ApiEndPoint } from 'src/model/util';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.page.html',
  styleUrls: ['./update-employee.page.scss'],
})
export class UpdateEmployeePage implements OnInit {
  public minDate = new Date(1950, 0, 1);
  public maxDate = new Date();
  public update: boolean = true;
  public emp: I_Employee = {} as I_Employee;
  ionicForm: FormGroup;
  public isSubmitted: boolean = false;
  constructor(
    private forBuilder: FormBuilder,
    public utilsrvc: UtilService,
    private httpClient: HttpService,
    private snackBar: SnackbarService,
    private activeRoute: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    let today: Date = new Date();
    let dt: string = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    let defaultUserType = this.utilsrvc.metaData.userType[0].value || '';
    let defaultRoles = this.utilsrvc.metaData.roles[0].value || '';

    this.ionicForm = this.forBuilder.group(
      {
        firstName: ['', [Validators.required, Validators.maxLength(15)]],
        middleName: ['', [Validators.maxLength(15)]],
        lastName: ['', [Validators.maxLength(15)]],
        gender: ['MALE', [Validators.required]],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
          ],
        ],
        mobileNumbers: [
          '',
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.minLength(10),
            Validators.pattern('^[0-9]+$'),
          ],
        ],
        dateOfBirth: [dt, [Validators.required]],
        dateOfExist: ['', []],
        dateOfJoin: [dt, [Validators.required]],
        userType: [defaultUserType, [Validators.required]],
        roles: [defaultRoles, [Validators.required]],
        salary: ['0', [Validators.required, Validators.pattern('^[0-9]+$')]],
        // passcode: ['', [Validators.required, Validators.minLength(8)]],
        // passRept: ['', [Validators.required, Validators.minLength(8)]],
        userName: ['', [Validators.required]],
      }
      //{ validator: this.matchPassword('passcode','passRept') }
    );

    this.activeRoute.queryParams.subscribe((p) => {
      if (p.data) {
        this.emp = JSON.parse(p.data);
        this.ionicForm.get('firstName').setValue(this.emp.firstName);
        this.ionicForm.get('middleName').setValue(this.emp.middleName);
        this.ionicForm.get('lastName').setValue(this.emp.lastName);
        this.ionicForm.get('gender').setValue(this.emp.gender);
        this.ionicForm.get('dateOfBirth').setValue(this.emp.dateOfBirth);
        this.ionicForm.get('dateOfJoin').setValue(this.emp.dateOfJoin);
        this.ionicForm.get('dateOfExist').setValue(this.emp.dateOfExist);
        this.ionicForm.get('salary').setValue(this.emp.salary);
        this.ionicForm.get('email').setValue(this.emp.email);
        this.ionicForm.get('mobileNumbers').setValue(this.emp.mobileNumbers);
        this.ionicForm.get('userName').setValue(this.emp.login.userName);
        this.ionicForm.get('userType').setValue(this.emp.userType);
        this.ionicForm.get('roles').setValue(this.emp.roles);
      }
    });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }

  matchPassword(firstControl, secondControl): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get(firstControl).value;
      const confirm = control.get(secondControl).value;

      if (password != confirm) {
        return { noMatch: true };
      }

      return null;
    };
  }
  submitForm() {}
  onSave() {
    this.isSubmitted = true;
    this.utilsrvc.isLoading = true;
    let empObj: any = { ...this.ionicForm.value };
    empObj.login = { ...this.emp.login };
    this.httpClient
      .put(ApiEndPoint.EMPLOYEE_UPDATE, this.emp.login.userName, empObj)
      .then((e) => {
        this.utilsrvc.isLoading = false;
        this.snackBar.openSnackBar('Update successfull');
      })
      .catch((e) => {
        this.utilsrvc.isLoading = false;
        console.log(e);
        this.snackBar.openSnackBar(e?.error?.error);
      });
  }

  isValid = (): boolean => {
    return this.ionicForm.valid;
  };

  onChangePassCode = () => {
    this.openDialog();
  };

  openDialog() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = { userName: this.emp.login.userName };

    this.dialog.open(ResetPasswordComponent, dialogConfig);
  }
}
