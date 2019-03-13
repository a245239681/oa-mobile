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
  async presentActionSheet() {
    const actionSheet = await this.actionSheetController.create({
      buttons: [
        {
          text: '拍照',
          // icon: 'trash',
          cssClass: 'sheetClass',
          handler: () => {
            console.log('拍照 clicked');
          }
        },
        {
          text: '从手机相册选择',
          cssClass: 'sheetClass',
          handler: () => {
            console.log('从手机相册选择 clicked');
          }
        },
        {
          text: '取消',
          icon: 'close',
          cssClass: 'cacelClass',
          handler: () => {
            console.log('取消 clicked');
          }
        }
      ]
    });
    await actionSheet.present();
  }
  detailCheck() {
    this.presentActionSheet();
  }
}
