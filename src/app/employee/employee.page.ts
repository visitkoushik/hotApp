import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { I_Employee } from 'src/model/employee';
import { HttpRespObject } from 'src/model/httpRespModel';
import { ApiEndPoint } from 'src/model/util';
import { HttpService } from '../providers/http.service';
import { UtilService } from '../providers/utilservice.service';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.page.html',
  styleUrls: ['./employee.page.scss'],
})
export class EmployeePage implements OnInit {
  public minDate = new Date(1950, 0, 1);
  public maxDate = new Date();
  public update: boolean = false;
  public emp: I_Employee = {} as I_Employee;
  ionicForm: FormGroup;


  constructor(
    private forBuilder: FormBuilder,
    public utilsrvc: UtilService,
    private httpClient: HttpService
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
    });
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

  submitForm() {

  }
  onSave() {
    console.log(this.ionicForm.value);
  }

  isValid = ():boolean=>{
    return this.ionicForm.valid;
  }
}