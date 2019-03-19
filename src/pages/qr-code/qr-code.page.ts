import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-qr-code',
  templateUrl: './qr-code.page.html',
  styleUrls: ['./qr-code.page.scss']
})
export class QrCodePage implements OnInit {
  sub: any;
  constructor(private nav: NavController, private platform: Platform) {}

  ngOnInit() {
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.nav.back();
    });
  }
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
  ionViewWillLeave() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
