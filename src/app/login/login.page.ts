import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../providers/auth/auth.service';
import { SnackbarService } from '../providers/snackbar.service';
import { UtilService } from '../providers/utilservice.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  username = '';
  passcode = '';

  constructor(
    private location: Location,
    private auth: AuthService,
    private util: UtilService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {}

  onLogin = () => {
    this.util.isLoading = true;
    this.auth
      .login(this.username, this.passcode)
      .then((e) => {
        this.util.isLoading = false;
        if (this.auth.redirectUrl) {
          this.router.navigateByUrl(this.auth.redirectUrl);
        } else {
          this.onCancel();
        }
      })
      .catch((e) => {
        console.log(e);
        this.snackbar.openSnackBar('Login Failed');
        this.util.isLoading = false;
      });
  };

  onCancel = () => {
    this.location.back();
  };
}
