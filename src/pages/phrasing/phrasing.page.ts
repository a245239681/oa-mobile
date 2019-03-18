import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  NavController
} from '@ionic/angular';
import { MainindexService } from 'src/service/maiindex/mainindex.service';

@Component({
  selector: 'app-phrasing',
  templateUrl: './phrasing.page.html',
  styleUrls: ['./phrasing.page.scss']
})
export class PhrasingPage implements OnInit {
  public ale: HTMLIonAlertElement;

  /** 常用语数组 */
  myList: any;

  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private nav: NavController,
    public mainindexService: MainindexService
  ) {}

  ngOnInit() {
    this.Getoftenuse();
  }

  /** 请求常用语列表 */
  Getoftenuse() {
    this.mainindexService.getoftenuse().subscribe(r => {
      console.log(r);
      if (r['State'] === 1) {
        this.myList = r['Data'];
      }
    });
  }

  async presentAlert() {
    this.ale = await this.alertController.create({
      // header: 'Alert',
      // subHeader: 'Subtitle',
      message: '删除成功'
      // buttons: ['OK']
    });

    await this.ale.present();
    this.ale.dismiss();
    // setTimeout(function() {}, 2000);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: '删除成功',
      position: 'middle',
      duration: 2000
    });
    toast.present();
  }
  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      message: '确定删除此条常用语吗?',
      buttons: [
        {
          text: '取消',
          // role: 'cancel',
          // cssClass: 'secondary',
          handler: blah => {
            console.log('Confirm Cancel: blah');
          }
        },
        {
          text: '确定',
          handler: () => {
            this.presentAlert();
            // setTimeout(function() {
            //   this.ale.dismiss();
            // }, 1000);
            // this.presentToast();
            console.log('Confirm Okay');
          }
        }
      ]
    });

    await alert.present();
  }
  /** 删除 */
  delete() {
    this.presentAlertConfirm();
  }
  /**
   * 返回
   */
  canGoBack() {
    this.nav.back();
  }
}
