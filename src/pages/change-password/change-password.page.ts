import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
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
  constructor(
    private nav: NavController,
    private activeRoute: ActivatedRoute,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private userinfo: UserInfo
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
      birthday: ''
    };
  }

  ngOnInit() {
    console.log(this.myData);
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
            this.toast.presentToast('修改失败');
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
    this.nav.back();
  }
}
