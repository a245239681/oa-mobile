import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from './../../service/maiindex/mainindex.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-handleinfo',
  templateUrl: './handleinfo.component.html',
  styleUrls: ['./handleinfo.component.scss']
})
export class HandleinfoComponent implements OnInit {
  @Input() itemmodel: any;

  // 意见数组
  adcviceArr: any[] = [];

  bodyData: any;

  // 保存key的数组
  keyArr: string[] = [];

  /** 内容块标题的字体颜色 */
  forecolors = {
    0: '#4877FB',
    1: '#f87a85',
    2: '#67C554',
    3: '#F99D31',
    4: '#4877FB',
    5: '#f87a85',
    6: '#67C554',
    7: '#D1202E',
    8: '#F99D31'
  };

  /** 内容块的分割线颜色 */
  borderbottom = {
    0: '1px solid #4877FB',
    1: '1px solid #f87a85',
    2: '1px solid #67C554',
    3: '1px solid #F99D31',
    4: '1px solid #4877FB',
    5: '1px solid #f87a85',
    6: '1px solid #67C554',
    7: '1px solid #D1202E',
    8: '1px solid #F99D31'
  };

  constructor(private service: MainindexService, public toast: CommonHelper) {}

  ngOnInit() {
    console.log(this.itemmodel);
    this.getdata();
  }

  /**
   * 办理信息-意见列表
   */

  getdata() {
    if (this.itemmodel.isRelated) {
      this.service
        .getallAttitudeList(
          this.itemmodel['TargetId'],
          this.itemmodel['ProcessType'],
          this.itemmodel['CoorType']
        )
        .subscribe(
          res => {
            if (res['State'] === 1) {
              this.bodyData = res['Data']['BodyData'];
              this.adcviceArr = [];
              this.keyArr = [];
              // tslint:disable-next-line:forin
              for (const key in this.bodyData) {
                console.log(key);
                this.keyArr.push(key);
                this.adcviceArr.push(this.bodyData[key]);
                console.log(this.adcviceArr);
                console.dir(this.adcviceArr);
              }
            } else {
              this.toast.presentToast('暂无数据');
            }
          },
          err => {
            this.toast.presentToast('请求失败');
          }
        );
    } else {
      this.service
        .getallAttitudeList(
          this.itemmodel['Id'],
          this.itemmodel['ProcessType'],
          this.itemmodel['CoorType']
        )
        .subscribe(
          res => {
            if (res['State'] === 1) {
              this.bodyData = res['Data']['BodyData'];
              this.adcviceArr = [];
              this.keyArr = [];
              // tslint:disable-next-line:forin
              for (const key in this.bodyData) {
                console.log(key);
                this.keyArr.push(key);
                this.adcviceArr.push(this.bodyData[key]);
                console.log(this.adcviceArr);
                console.dir(this.adcviceArr);
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
  }
  expression(i) {
    console.log(i);
  }
  /**
   * 标题颜色
   */
  // btys(i: any) {
  //   if (i === '拟办部门意见') {
  //     return '#4877FB';
  //   } else if (i === '局领导批示') {
  //     return '#F87A85';
  //   } else if (i === '主办意见') {
  //     return '#67C554';
  //   } else {
  //     return '#4877FB';
  //   }
  // }

  // /** 块分割线颜色 */
  // kfgx(i: any) {
  //   if (i === '拟办部门意见') {
  //     return '1px solid #4877FB';
  //   } else if (i === '局领导批示') {
  //     return '1px solid #F87A85';
  //   } else if (i === '主办意见') {
  //     return '1px solid #67C554';
  //   } else {
  //     return '1px solid #4877FB';
  //   }
  // }
  /**
   * 分割线
   */
  fgx(i: any, n: any) {
    if (i.length > 1) {
      if (n < i.length - 1) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }
}
