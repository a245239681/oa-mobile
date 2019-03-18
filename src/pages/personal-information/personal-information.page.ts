import { Component, OnInit } from '@angular/core';
import { ActionSheetController, NavController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss']
})
export class PersonalInformationPage implements OnInit {
  myData = { Mobile: '', Phone: '' };
  sex: string;
  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController,
    private nav: NavController
  ) {
    this.activeRoute.queryParams.subscribe(params => {
      console.log(params);
      this.myData = JSON.parse(params['item']);
    });
    this.sex = localStorage.getItem('Sex');
  }

  ngOnInit() {
    console.log(this.myData);
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
            this.sex = '男';
          }
        },
        {
          text: '女',
          handler: () => {
            this.sex = '女';
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
  timeDateChange(e) {
    console.log(e);
    console.log(e['detail']['value']);
  }
  toPhone(e: string) {
    this.router.navigate(['change-phonenumber'], {
      queryParams: {
        title: e,
        item: JSON.stringify(this.myData)
      }
    });
  }
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
}
