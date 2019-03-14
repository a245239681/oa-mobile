import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
}
