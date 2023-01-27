import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/providers/auth/auth.service';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Items } from 'src/model/items';
import { ApiEndPoint } from 'src/model/util';

import { CartService } from '../../providers/cart-service.service';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.page.html',
  styleUrls: ['./add-branch.page.scss'],
})
export class AddBranchPage implements OnInit {
  isSubmitted: boolean;
  branchForm: FormGroup;
  allItems: I_Items[] = [];
  constructor(
    public utilsrvc: UtilService,
    private httpClient: HttpService,
    private snackBar: SnackbarService,
    private auth: AuthService,
    private router: Router,
    private cartsrvc: CartService
  ) {}

  ngOnInit() {
    this.cartsrvc.getAllItem(
      this.utilsrvc.branchCode,
      true,
      (e: AppResponse<I_Items[]>) => {
        this.allItems = [...this.cartsrvc.mainItems];
      },
      (r) => {
        this.snackBar.openSnackBar('Item not Available');
      }
    );
    this.branchForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.maxLength(15),
      ]), //['', [Validators.required, Validators.maxLength(15)]],
      code: new FormControl('', [
        Validators.required,
        Validators.maxLength(10),
      ]),
      address: new FormControl('', [Validators.maxLength(30)]),
      items: new FormControl(''),
    });
  }

  get controls() {
    return this.branchForm.controls;
  }

  onRefresh = () => {
    this.getBranchCode();
  };

  isValid = (): boolean => {
    return this.branchForm.valid;
  };

  onSave() {
    this.isSubmitted = true;
    this.utilsrvc.isLoading = true;
    this.httpClient
      .post(ApiEndPoint.BRANCH_ADD, this.branchForm.value)
      .then((e) => {
        this.utilsrvc.isLoading = false;
        this.snackBar.openSnackBar('Branch Added');

        this.router.navigate(['/branch-tab/list']);
      })
      .catch((e) => {
        this.utilsrvc.isLoading = false;
        this.snackBar.openSnackBar(e.error.error);
      });
  }

  getBranchCode = () => {
    this.utilsrvc.isLoading = true;
    this.httpClient
      .get(ApiEndPoint.BRANCH_CODE)
      .then((e: AppResponse<string>) => {
        this.utilsrvc.isLoading = false;
        this.branchForm.get('code').setValue(e.responseObject);
      })
      .catch((e) => {
        this.utilsrvc.isLoading = false;
        this.snackBar.openSnackBar(e.error.error);
      });
  };
  compareWith(o1, o2) {
    return o1 && o2 && Array.isArray(o2) ? o2.some((o) => o === o1) : o1 === o2;
  }

  handleChange(ev) {
    console.log(ev.target.value);
    console.log(this.controls);
  }
}
