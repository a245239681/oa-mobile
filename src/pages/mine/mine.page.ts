import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/infrastructure/user-info';
import { NavController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { AppVersion } from '@ionic-native/app-version/ngx';
@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss']
})
export class MinePage implements OnInit {
  alertVC: HTMLIonAlertElement;
  /** 个人信息 */
  personaldetails = {
    /** 性别 */
    Sex: this.userinfo.getSex(),
    /** 电话号码 */
    Phone: this.userinfo.getPhone(),
    /** 手机号码 */
    Mobile: this.userinfo.getMobile(),
    /** 用户名 */
    GetUserName: this.userinfo.GetUserName(),
    /** 所属部门 */
    DeptName: this.userinfo.getDeptName(),
    /** 个人Id */
    id: this.userinfo.getPersonageId(),
    /** 生日 */
    Birthday: this.userinfo.getBirthday()
  };
  versionCode: any;
  constructor(
    private userinfo: UserInfo,
    private nav: NavController,
    private route: Router,
    public alertController: AlertController,
    private toast: CommonHelper,
    private appVersion: AppVersion
  ) {}

  ngOnInit() {
    // console.log(this.personaldetails);
    this.appVersion.getVersionCode().then(value => {
      this.versionCode =
        (value + '').indexOf('.') > -1 ? value.toString() : value + '.0';
    });
    // this.versionCode = this.versionCode['__zone_symbol__value'];
    console.log(this.versionCode);
  }

  /** 注销 */
  logout() {
    this.userinfo.removeToken();
    this.nav.navigateRoot('login');
    this.toast.presentToast('注销成功');
  }

  /** 修改密码 */
  Changepassword() {
    this.route.navigate(['change-password'], {
      queryParams: {
        item: JSON.stringify(this.personaldetails)
      }
    });
  }
  /** 跳转到常用语设置 */
  toPhrasing() {
    this.route.navigate(['phrasing'], {
      queryParams: {
        item: JSON.stringify(this.personaldetails)
      }
    });
  }
  /** 详情 */
  GoDetails() {
    this.route.navigate(['personal-information'], {
      queryParams: {
        item: JSON.stringify(this.personaldetails)
      }
    });
  }

  /**
   *  注销
   * @param index 弹出提示
   */
  async presentEndAlert() {
    this.alertVC = await this.alertController.create({
      header: '提示',
      message: '是否确定注销当前用户登陆？',
      buttons: [
        {
          text: '确定',
          cssClass: 'secondary',
          handler: () => {
            this.logout();
          }
        },
        {
          text: '取消',
          role: 'cancle',
          cssClass: 'secondary',
          handler: () => {}
        }
      ]
    });
    this.alertVC.present();
  }
}
