import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss']
})
export class QrCodePage implements OnInit {
  constructor(private nav: NavController) {}

  ngOnInit() {}
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
}
