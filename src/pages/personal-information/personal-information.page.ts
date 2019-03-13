import { Component, OnInit } from '@angular/core';
import { ActionSheetController } from '@ionic/angular';

@Component({
  selector: 'app-personal-information',
  templateUrl: './personal-information.page.html',
  styleUrls: ['./personal-information.page.scss']
})
export class PersonalInformationPage implements OnInit {
  constructor(public actionSheetController: ActionSheetController) {}

  ngOnInit() {}
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
            console.log('拍照 clicked');
          }
        },
        {
          text: '女',
          handler: () => {
            console.log('从手机相册选择 clicked');
          }
        },
        {
          text: '取消',
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
}
