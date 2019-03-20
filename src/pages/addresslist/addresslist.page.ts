import { CommonHelper } from './../../infrastructure/commonHelper';
import { MainindexService } from './../../service/maiindex/mainindex.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonRefresher, IonInfiniteScroll, ActionSheetController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getDateDiff } from 'src/infrastructure/regular-expression';
@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.page.html',
  styleUrls: ['./addresslist.page.scss'],
})
export class AddresslistPage implements OnInit {

  title = '通讯录';
  items = [];

  temp: any;
  /**
   * 搜索
   */
  searchStr = '';

  /**
   * 搜索结果
   */
   result = [];

  constructor(
    private nav: NavController,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private activeRoute: ActivatedRoute,
    private route: Router,
    public actionSheetController: ActionSheetController
  ) { }

  ngOnInit() {
    this.getMailList();
  }

  /**
   * 搜索
   */
  SearchFilter(event: any) {
    const val = event.toLowerCase();
    // filter our data
    this.result = [];
    const me = this;
    this.temp.forEach(function(d: any) {
      const items = d.children.filter(s => s.text.indexOf(val) !== -1
       || s.mobile.indexOf(val) !== -1
       || ('' + s.phone).indexOf(val) !== -1 );
      if ( items.length > 0) {
        me.result.push({
          text: d.text,
          children: items
        });
      }
     // return d.text.toLowerCase().indexOf(val) !== -1 || !val;
    });
     console.log(this.result);
    // this.route.navigate(['mail-list'], {
    //   queryParams: {
    //     item: JSON.stringify(temp),
    //     dept: JSON.stringify(this.temp.text)
    //   }
    // });
  }

  /**
   * 获取通讯录数据列表
   */
  getMailList() {

    this.mainindexservice.getMaliList().subscribe(res => {
      if (res.State === 1) {

        this.items = res.Data[0].children;
        this.temp = res.Data[0].children;
         console.log(this.temp);
      }
    });
  }

  async presentActionSheet(e: any) {
    const buttons = [{
      text: '呼叫  ' + e.mobile,
      handler: () => {
        console.log(e.mobile);
        this.callIphone(e.mobile);
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
          this.callIphone(e.mobile);
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

  callIphone(e: any) {
    document.location.href = 'tel:' + e;
  }

  /**
   * 查看当前部门下的相关人员
   */
  mailShow(item: any, dept: any) {
    // console.log(item);
    //  console.log(dept);
    this.route.navigate(['mail-list'], {
      queryParams: {
        item: JSON.stringify(item),
        dept: JSON.stringify(dept),
        allList: JSON.stringify(this.temp),
      }
    });
  }

}
