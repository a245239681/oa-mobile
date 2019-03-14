import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-add-edit-phrasing',
  templateUrl: './add-edit-phrasing.page.html',
  styleUrls: ['./add-edit-phrasing.page.scss']
})
export class AddEditPhrasingPage implements OnInit {
  title: String;
  public ale: HTMLIonAlertElement;
  constructor(
    private router: ActivatedRoute,
    private nav: NavController,
    private alertController: AlertController
  ) {
    this.router.queryParams.subscribe(r => {
      console.log(r);
      this.title = r.title === '添加' ? '添加常用语' : '修改常用语';
    });
  }

  ngOnInit() {}
  async presentAlert() {
    this.ale = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: '保存成功'
      // buttons: ['OK']
    });

    await this.ale.present();
    this.ale.dismiss();
    // setTimeout(function() {}, 2000);
  }
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
  /** 保存 */
  submit() {
    this.presentAlert();
  }
}
