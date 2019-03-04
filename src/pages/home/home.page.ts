import { LoginService } from './../../service/login/login.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private loginservice: LoginService) {

  }

  login() {
    this.loginservice.login('温欢', '123').subscribe((res) => {
      console.log(res)
    }, err => {
      console.log(err);
    });
  }

  ionViewDidLoad() {

  }

}
