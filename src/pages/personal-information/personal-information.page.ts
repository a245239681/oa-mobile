import { Component, OnInit } from '@angular/core';
import {
  ActionSheetController,
  NavController,
  ModalController,
  Platform
} from '@ionic/angular';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { UserInfo } from 'src/infrastructure/user-info';
import { ChangePhonenumbersComponent } from './change-phonenumbers/change-phonenumbers.component';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss']
})
export class PersonalInformationPage implements OnInit {
  myData: any;
  sub: any;
  constructor(
    public actionSheetController: ActionSheetController,
    private nav: NavController,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private userinfo: UserInfo,
    public modalController: ModalController,
    private platform: Platform
  ) {
    // this.activeRoute.queryParams.subscribe(params => {
    //   this.myId = JSON.parse(params['item']['id']);
    // });
    this.GetStaffInfo(this.userinfo.getPersonageId());
  }

  ngOnInit() {
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => {
      this.nav.back();
    });
  }

  /** 请求个人信息详情 */
  GetStaffInfo(id: string) {
    this.mainindexservice.GetStaffInfo(id).subscribe(
      r => {
        if (r['State']) {
          this.myData = r['Data'];
        } else {
          this.toast.presentToast('个人信息获取失败');
        }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }
  /** 头像sheet */
  async headPortraitSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '拍照',
          // icon: 'trash',
          // cssClass: 'sheetClass',
          handler: () => {
          }
        },
        {
          text: '从手机相册选择',
          // cssClass: 'sheetClass',
          handler: () => {
          }
        },
        {
          text: '取消',
          role: 'cancel',
          // icon: 'close',
          // cssClass: 'cacelClass',
          handler: () => {
          }
        }
      ]
    });
    await actionSheet.present();
  }
  /** 性别sheet */
  async geenderSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '男',
          handler: () => {
            this.myData.Sex = '男';
            this.Confirm();
          }
        },
        {
          text: '女',
          handler: () => {
            this.myData.Sex = '女';
            this.Confirm();
          }
        },
        {
          text: '取消',
          role: 'cancel',
          // icon: 'close',
          handler: () => {
          }
        }
      ]
    });
    await actionSheet.present();
  }
  /** sheet 弹出 */
  detailCheck(s: string) {
    switch (s) {
      case '头像':
        this.headPortraitSheet();
        break;
      case '性别':
        this.geenderSheet();
      // tslint:disable-next-line:no-switch-case-fall-through
      default:
        break;
    }
  }
  // 修改生日
  timeDateChange(e) {
    this.myData.Birthday = e.detail.value;
    this.Confirm();
  }

  /** 返回 */
  canGoBack() {
    this.nav.back();
  }

  /** 修改信息 */
  Confirm() {
    this.mainindexservice.UpdateStaffInfo(this.myData).subscribe(
      r => {
        if (r['State'] === 1) {
          this.toast.presentToast('修改成功');
          this.userinfo.Birthday(this.myData.Birthday);
        } else {
          this.toast.presentToast('修改失败');
        }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  /** 开启修改手机号，办公电话号码 */
  async countersignModal(d: any) {
    this.myData.title = d;
    // componentProps 传值 d:数据
    const modal = await this.modalController.create({
      component: ChangePhonenumbersComponent,
      componentProps: { data: this.myData }
    });
    await modal.present();
    // 接收模态框传回的值
    const data = await modal.onDidDismiss();
    // this.myData.Mobile = data['result']['Mobile'];
    // this.myData.Phone = data['result']['Phone'];
  }
}
