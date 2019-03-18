import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { UserInfo } from 'src/infrastructure/user-info';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'app-change-phonenumber',
  templateUrl: './change-phonenumber.page.html',
  styleUrls: ['./change-phonenumber.page.scss']
})
export class ChangePhonenumberPage implements OnInit {
  public item: any;
  title: string;
  Mobile: string;
  Phone: string;
  constructor(
    private nav: NavController,
    private activeRoute: ActivatedRoute,
    private mainindexservice: MainindexService,
    private userinfo: UserInfo,
    private toast: CommonHelper,
    private route: Router
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      this.item = JSON.parse(params['item']);
      this.title = '修改' + params['title'];
      this.Mobile = this.item.Mobile;
      this.Phone = this.item.Phone;
    });
    console.log(this.title);
  }

  ngOnInit() {}
  submit() {
    this.item.Mobile = this.Mobile;
    this.item.Phone = this.Phone;
    console.log(this.item);
    this.route.navigate(['tabs/tabs/tab3']);
    this.mainindexservice.UpdateStaffInfo(this.item).subscribe(
      r => {
        if (r['State'] === 1) {
          this.userinfo.Mobile('Mobile', this.Mobile);
          this.userinfo.Phone('Phone', this.Phone);
          this.toast.presentToast('修改成功');
          this.route.navigate(['tabs/tabs/tab3']);
        } else {
          this.toast.presentToast('修改失败');
        }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
}
