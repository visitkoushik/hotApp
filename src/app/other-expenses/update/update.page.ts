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
import { I_Transaction } from 'src/model/Transaction';
import { ApiEndPoint } from 'src/model/util';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {
  onTypeChange($event: Event) {}
  public transaction: I_Transaction = {} as I_Transaction;

  constructor(
    public util: UtilService,
    private httpService: HttpService,
    private snackBar: SnackbarService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activeRoute.queryParams.subscribe((param) => {
      this.transaction = { ...param } as I_Transaction;
    });
  }
  onBranchChanged() {
    this.transaction.branchCode = this.util.branchCode;
  }
  onSave() {
    this.util.isLoading=true;
    this.transaction.branchCode = this.util.branchCode;
    this.httpService
      .put(
        ApiEndPoint.TRANSACTION_UPDATE,
        this.transaction.id,
        this.transaction
      )
      .then((e) => {
         this.util.isLoading=false;
        this.snackBar.openSnackBar('Transaction Updated');
        this.transaction = {} as I_Transaction;
      })
      .catch((e: AppResponse<any>) => {
        this.util.isLoading=false;
        this.snackBar.openSnackBar(e.error);
      });
  }
}
