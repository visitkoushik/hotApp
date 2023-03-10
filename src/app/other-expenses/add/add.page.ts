import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/providers/http.service';
import { SnackbarService } from 'src/app/providers/snackbar.service';
import { UtilService } from 'src/app/providers/utilservice.service';
import { AppResponse } from 'src/model/AppResponse';
import { I_Transaction } from 'src/model/Transaction';
import { ApiEndPoint } from 'src/model/util';

@Component({
  selector: 'app-add',
  templateUrl: './add.page.html',
  styleUrls: ['./add.page.scss'],
})
export class AddPage implements OnInit {
  onTypeChange($event: Event) {}
  public transaction: I_Transaction = {} as I_Transaction;

  constructor(
    public util: UtilService,
    private httpService: HttpService,
    private snackBar: SnackbarService
  ) {}

  ngOnInit() {}
  onBranchChanged() {
   this.transaction.branchCode = this.util.branchCode
  }
  onSave() {
    this.util.isLoading=true;
    this.transaction.branchCode = this.util.branchCode;
    this.httpService
      .post(ApiEndPoint.TRANSACTION_ADD, this.transaction)
      .then((e) => {
        this.util.isLoading=false;
        this.snackBar.openSnackBar('Transaction Added');
        this.transaction = {} as I_Transaction;
      }).catch((e:AppResponse<any>)=>{
        this.util.isLoading=false;
        this.snackBar.openSnackBar(e.error);
      });
  }
}
