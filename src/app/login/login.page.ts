import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../providers/auth.service';
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
    private util: UtilService
  ) {}

  ngOnInit() {}

  onLogin = () => {
    this.util.isLoading=true;
    this.login()
      .then((e) => {
        this.auth.isLoggedIn = e;
        this.onCancel();
        console.log('LOGIN');
        this.util.isLoading=false;
      })
      .catch((e) => {
        this.auth.isLoggedIn = e;
        console.log('LOGIN ERROR');
        this.util.isLoading=false;
      });
  };

  onCancel = () => {
    this.location.back();
  };

  login = (): Promise<boolean> =>

    new Promise((resolve, reject) => {
      setTimeout(() => {
        if (this.username === 'houseoftea' && this.passcode === 'janina') {
          resolve(true);
        } else {
          reject(false);
        }
      }, 15000);
    });
}
