import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { UserInfo } from 'src/infrastructure/user-info';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss']
})
export class PersonalInformationPage implements OnInit {
  myData: any;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    private nav: NavController,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private userinfo: UserInfo
  ) {
    // this.activeRoute.queryParams.subscribe(params => {
    //   console.log(params);
    //   this.myId = JSON.parse(params['item']['id']);
    // });
    this.GetStaffInfo(this.userinfo.getPersonageId());
  }

  ngOnInit() {}

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

  async headPortraitSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '拍照',
          // icon: 'trash',
          // cssClass: 'sheetClass',
          handler: () => {
            console.log('拍照 clicked');
          }
        },
        {
          text: '从手机相册选择',
          // cssClass: 'sheetClass',
          handler: () => {
            console.log('从手机相册选择 clicked');
          }
        },
        {
          text: '取消',
          role: 'cancel',
          // icon: 'close',
          // cssClass: 'cacelClass',
          handler: () => {
            console.log('取消 clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
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
            console.log('取消 clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
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
    console.log(e);
    console.log(e['detail']['value']);
    this.myData.Birthday = e.detail.value;
    this.Confirm();
  }

  /** 返回 */
  canGoBack() {
    this.nav.back();
  }

  /** 修改信息 */
  Confirm() {
    console.log(1);
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

  /** 修改手机号，办公电话号码 */
  toPhone(e: string) {
    this.router.navigate(['change-phonenumber'], {
      queryParams: {
        title: e,
        item: JSON.stringify(this.myData)
      }
    });
  }
}
