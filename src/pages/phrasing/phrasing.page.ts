import { Component, OnInit } from '@angular/core';
import {
  AlertController,
  ToastController,
  NavController,
  ModalController,
  Platform
} from '@ionic/angular';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { AddEditPhrasingPage } from '../add-edit-phrasing/add-edit-phrasing.page';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'app-phrasing',
  templateUrl: './phrasing.page.html',
  styleUrls: ['./phrasing.page.scss']
})
export class PhrasingPage implements OnInit {
  public ale: HTMLIonAlertElement;

  /** 常用语数组 */
  myList: any;
  sub: any;
  constructor(
    public alertController: AlertController,
    public toastController: ToastController,
    private nav: NavController,
    public mainindexService: MainindexService,
    private modalController: ModalController,
    private toast: CommonHelper,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.Getoftenuse();
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.nav.back();
    });
  }

  /** 请求常用语列表 */
  Getoftenuse() {
    this.mainindexService.getoftenuse().subscribe(r => {
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
  async presentAlertConfirm(id) {
    const alert = await this.alertController.create({
      message: '确定删除此条常用语吗?',
      buttons: [
        {
          text: '取消',
          role: 'cancel',
          // cssClass: 'secondary',
          handler: blah => {
          }
        },
        {
          text: '确定',
          handler: () => {
            this.mainindexService.DailyDelete(id).subscribe(res => {
              if (res === true) {
                this.toast.presentToast('删除成功');
                this.Getoftenuse();
              } else {
                this.toast.presentToast(res + '');
              }
            });
          }
        }
      ]
    });

    await alert.present();
  }
  /** 删除 */
  delete(id) {
    this.presentAlertConfirm(id);
  }
  /**
   * 返回
   */
  canGoBack() {
    this.nav.back();
  }

  /** 开启会签模态框 */
  async phrasingModal(e: string, d?: any) {
    const Data = {
      title: e,
      data: d
    };
    // componentProps 传值 d:数据
    const modal = await this.modalController.create({
      component: AddEditPhrasingPage,
      componentProps: { data: Data }
    });
    await modal.present();
    // 接收模态框传回的值
    const data = await modal.onDidDismiss();
    if (data.data.result === 'change') {
      this.Getoftenuse();
    }
  }
  ionViewWillLeave() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
