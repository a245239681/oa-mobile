import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import {
  UpdateStaffInfoModel,
  MainindexService
} from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { UserInfo } from 'src/infrastructure/user-info';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss']
})
export class ChangePasswordPage implements OnInit {
  item: any;
  mima = '';
  myData: UpdateStaffInfoModel;
  sub: any;
  constructor(
    private nav: NavController,
    private activeRoute: ActivatedRoute,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private userinfo: UserInfo,
    private platform: Platform
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      this.item = JSON.parse(params['item']);
    });
    this.myData = {
      id: this.item.id,
      newPassword: '',
      /** 电话号码 */
      phone: this.item.Phone,
      /** 手机号码 */
      mobile: this.item.Mobile,
      /** 性别 */
      sex: this.item.Sex,
      /** 生日 */
      birthday: this.item.Birthday
    };
    if (!this.myData.sex) {
      this.myData.sex = '';
    }
    if (!this.myData.birthday) {
      this.myData.birthday = '';
    }
  }

  ngOnInit() {
    console.log(this.myData);
    this.sub = this.platform.backButton.subscribeWithPriority(9999, () => {
      // this.nav.pop();
      // return true;
      this.nav.back();
    });
  }

  /** 修改密码 */
  Confirm() {
    if (this.myData.newPassword !== this.mima) {
      this.toast.presentToast('两次密码不一致');
    } else {
      console.log(1);
      this.mainindexservice.UpdateStaffInfo(this.myData).subscribe(
        r => {
          if (r['State'] === 1) {
            this.userinfo.removeToken();
            this.nav.navigateRoot('login');
            this.toast.presentToast('修改成功');
          } else {
            this.toast.presentToast(r['Data']);
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
    }
  }

  /** 返回 */
  canGoBack() {
    // this.backState = true;
    this.nav.back();
  }

  ionViewWillLeave() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
    // if (!this.backState){
    //   this.nav.back();
    //   this.backState = true;
    //   return false;
    // }
    // console.log('23123123');
  }
}
