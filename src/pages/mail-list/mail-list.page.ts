import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController, Platform, ActionSheetController } from '@ionic/angular';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ApiUrlManagement } from 'src/infrastructure/api-url-management';
@Component({
  selector: 'app-mail-list',
  templateUrl: './mail-list.page.html',
  styleUrls: ['./mail-list.page.scss'],
})
export class MailListPage implements OnInit {

  /**
   * 列表传进来的数据
   */
  itemmodel: any;

  /**
   * 所属部门
   */
  deptModel: any;

  /**
   * 总数
   */
  num: any;

  /**
   * 标题
   */
  title = '部门相关人员';

  constructor(
    private activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
      this.deptModel = JSON.parse(params['dept']);
      this.num = this.itemmodel.length;
      console.log(this.itemmodel);
    });
  }

  ngOnInit() {
  }

  async presentActionSheet(e: any) {
    const buttons = [{
      text: '呼叫  ' + e.mobile,
      handler: () => {
        console.log(e.mobile);
        this.callIpnone(e.mobile);
        // console.log('Delete clicked');
      }
    },
    {
      text: '取消',
      // icon: 'close',
      role: 'cancel',
      handler: () => {
        // console.log('Cancel clicked');
      }
    }];
    if (e.phone) {
      buttons.splice(1, 0, {
        text: '呼叫  ' + e.phone,
        handler: () => {
          this.callIpnone(e.mobile);
          // console.log('Play clicked');
        }
      });
    }
    const actionSheet = await this.actionSheetController.create({
      // header: 'Albums',
      buttons: buttons
    });

    await actionSheet.present();
  }


  /**
   * 电话
   */

  callMe(item: any) {
    console.log(item);
    this.presentActionSheet(item);
  }

  callIpnone(e: any) {


  }

  /**
  * 返回
  */
  canGoBack() {
    history.back();
    return false;
  }

}
