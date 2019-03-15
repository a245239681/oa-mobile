import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circulationinfo',
  templateUrl: './circulationinfo.component.html',
  styleUrls: ['./circulationinfo.component.scss']
})
export class CirculationinfoComponent implements OnInit {
  @Input() itemmodel: any;

  forecolors = {
    协办部门: '#4877FB',
    传阅结果: '#F99D31',
    流转情况: '#67C554',
    领导批示: '#D1202E'
  };
  backcolors = {
    协办部门: '#DDF6FB',
    传阅结果: '#FDF3E6',
    流转情况: '#E1FAE4',
    领导批示: 'rgb(253,234,234)'
  };

  parenteArr = [];

  constructor(
    private mainservice: MainindexService,
    private toast: CommonHelper
  ) {}

  ngOnInit() {
    this.getdata();
  }

  /**
   * 获取数据
   */
  getdata() {
    this.mainservice.getReciveDetailInfo(this.itemmodel['Id']).subscribe(
      res => {
        console.log(res);
        if (res['State'] === 1) {
          this.parenteArr = res['Data'];
          if (this.parenteArr) {
            this.parenteArr.forEach(
              (v, i) => (v.hidden = v.children.length === 0 || i > 0)
            );
          }
        } else {
          this.toast.presentToast('暂无数据');
        }
      },
      err => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  /**
   * 点击展示
   */
  getsubtitle(item) {
    // console.log(itemid);
    // var item = this.parenteArr[itemid];
    // 如果有数据了就不请求了
    if (item['children'].length > 0) {
      item.hidden = !item.hidden;
    } else {
      this.mainservice
        .getReciveDetailInfo(this.itemmodel['Id'], item['ID'])
        .subscribe(
          res => {
            console.log(res);
            if (res['State'] === 1) {
              item['children'] = res['Data'];
              item.hidden = item['children'].length === 0;
            } else {
              this.toast.presentToast('暂无数据');
            }
          },
          err => {
            this.toast.presentToast('请求失败');
          }
        );
    }
  }

  /** 点击展示 */
  // accordion(){

  // }

  // /**
  //  * 标题颜色
  //  */
  // btys(i: any) {
  //   if (i === '协办部门') {
  //     return '#4877FB';
  //   } else if (i === '传阅结果') {
  //     return '#F99D31';
  //   } else if (i === '流转情况') {
  //     return '#67C554';
  //   } else if (i === '领导批示') {
  //     return '#D1202E';
  //   } else {
  //     return '#4877FB';
  //   }
  // }

  // /** 标题背景色 */
  // btbjs(i: any) {
  //   if (i === '协办部门') {
  //     return '#DDF6FB';
  //   } else if (i === '传阅结果') {
  //     return '#FDF3E6';
  //   } else if (i === '流转情况') {
  //     return '#E1FAE4';
  //   } else if (i === '领导批示') {
  //     return '#f141431c';
  //   } else {
  //     return '#DDF6FB';
  //   }
  // }

  // /** 块分割线颜色 */
  // kfgx(i: any) {
  //   if (i === '协办部门') {
  //     return '1px solid #4877FB';
  //   } else if (i === '传阅结果') {
  //     return '1px solid #F99D31';
  //   } else if (i === '流转情况') {
  //     return '1px solid #67C554';
  //   } else if (i === '领导批示') {
  //     return '1px solid #D1202E';
  //   } else {
  //     return '1px solid #4877FB';
  //   }
  // }
  // /**
  //  * 分割线
  //  */
  // fgx(i: any, n: any) {
  //   console.log(i);
  //   if (i.length > 1) {
  //     if (n < i.length - 1) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   } else {
  //     return false;
  //   }
  // }
}
