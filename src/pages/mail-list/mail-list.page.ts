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

  allListModel: any;

    /**
   * 搜索
   */
  searchStr = '';

  /**
   * 标题
   */
  title = '部门相关人员';

   /**
   * 搜索结果
   */
  result = [];

  constructor(
    private activeRoute: ActivatedRoute,
    public actionSheetController: ActionSheetController
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
      this.deptModel = JSON.parse(params['dept']);
      this.allListModel = JSON.parse(params['allList']);
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
      text: '发送短信至' + e.mobile,
      handler: () => {
        document.location.href = 'mms:' + e.mobile;
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
      buttons.splice(2, 0, {
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
   * 搜索
   */
  SearchFilter(event: any) {
    const val = event.toLowerCase();
    // filter our data
    this.result = [];
    const me = this;
    this.allListModel.forEach(function(d: any) {
      const items = d.children.filter(s => s.text.indexOf(val) !== -1
       || s.mobile.indexOf(val) !== -1
       || ('' + s.phone).indexOf(val) !== -1 );
      if ( items.length > 0) {
        me.result.push({
          text: d.text,
          children: items
        });
      }
    });
    // console.log(this.result);

  }


  /**
   * 电话
   */

  callMe(item: any) {
    console.log(item);
    this.presentActionSheet(item);
  }

  callIpnone(e: any) {
    document.location.href = 'tel:' + e;
  }

  /**
  * 返回
  */
  canGoBack() {
    history.back();
    return false;
  }

}
