import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/infrastructure/user-info';
import { NavController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mine',
  templateUrl: './mine.page.html',
  styleUrls: ['./mine.page.scss']
})
export class MinePage implements OnInit {
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
    id: this.userinfo.getPersonageId()
  };
  constructor(
    private userinfo: UserInfo,
    private nav: NavController,
    private route: Router
  ) {}

  ngOnInit() {
    console.log(this.personaldetails);
  }

  /** 注销 */
  logout() {
    this.userinfo.removeToken();
    this.nav.navigateRoot('login');
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
}
