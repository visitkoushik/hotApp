import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { I_Employee } from 'src/model/employee';
import { HttpRespObject } from 'src/model/httpRespModel';
import { ApiEndPoint } from 'src/model/util';
import { HttpService } from '../../providers/http.service';
import { SnackbarService } from '../../providers/snackbar.service';
import { UtilService } from '../../providers/utilservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee-add.page.html',
  styleUrls: ['./employee-add.page.scss'],
})
export class EmployeeAddPage implements OnInit {
  public minDate = new Date(1950, 0, 1);
  public maxDate = new Date();
  public update: boolean = false;
  public emp: I_Employee = {} as I_Employee;
  ionicForm: FormGroup;
  public isSubmitted:boolean = false;
  constructor(
    private forBuilder: FormBuilder,
    public utilsrvc: UtilService,
    private httpClient: HttpService,
    private snackBar:SnackbarService
  ) {}

  ngOnInit() {
    let today: Date = new Date();
    let dt: string = `${today.getFullYear()}-${
      today.getMonth() + 1
    }-${today.getDate()}`;

    let defaultUserType = this.utilsrvc.metaData.userType[0].value || '';
    let defaultRoles = this.utilsrvc.metaData.roles[0].value || '';

    this.fetchMetaData();

    this.ionicForm = this.forBuilder.group({
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
      passcode: ['', [Validators.required, Validators.minLength(8)]],
      passRept: ['', [Validators.required, Validators.minLength(8)]],
      userName: ['', [Validators.required]],
    }, { validator: this.matchPassword('passcode','passRept') });
  }
  get errorControl() {
    return this.ionicForm.controls;
  }
  fetchMetaData = () => {
    this.utilsrvc.isLoading = true;

    this.httpClient
      .get(ApiEndPoint.METADATA)
      .then((metadataResp: HttpRespObject) => {
        if (metadataResp.status == 1) {
          this.utilsrvc.metaData = metadataResp.responseObject;
        }
        if (this.utilsrvc.metaData.ownerNeedtocreate) {
          throw 'Owner need to create';
        }
        this.utilsrvc.isLoading = false;
      })
      .catch((e) => {
        this.utilsrvc.isLoading = false;
      });
  };
  matchPassword(firstControl, secondControl): ValidatorFn {

    return (control: AbstractControl): ValidationErrors | null => {

      const password = control.get(firstControl).value;
      const confirm = control.get(secondControl).value;

      if (password != confirm) { return { 'noMatch': true } }

      return null

    }
  }
  submitForm() {}
  onSave() {
    this.isSubmitted = true;
    this.utilsrvc.isLoading = true;
    this.httpClient
      .post(ApiEndPoint.EMPLOYEE_ADD, this.ionicForm.value)
      .then((e) => {
        this.utilsrvc.isLoading = false;
      })
      .catch((e) => {
        this.utilsrvc.isLoading = false;
        this.snackBar.openSnackBar(e.error.error);
      });
  }

  isValid = (): boolean => {
    return this.ionicForm.valid;
  };
}
