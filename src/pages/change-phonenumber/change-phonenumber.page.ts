import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-phonenumber',
  templateUrl: './change-phonenumber.page.html',
  styleUrls: ['./change-phonenumber.page.scss']
})
export class ChangePhonenumberPage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
}
