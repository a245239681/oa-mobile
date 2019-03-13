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

  //意见数组
  adcviceArr: any[] = [];

  bodyData: any;

  //保存key的数组
  keyArr: string[] = [];

  constructor(private service: MainindexService, public toast: CommonHelper) {}

  ngOnInit() {
    this.getdata();
  }

  /**
   * 办理信息-意见列表
   */

  getdata() {
    this.service
      .getallAttitudeList(
        this.itemmodel['Id'],
        this.itemmodel['ProcessType'],
        this.itemmodel['CoorType']
      )
      .subscribe(
        res => {
          if (res['State'] == 1) {
            this.bodyData = res['Data']['BodyData'];
            this.adcviceArr = [];
            this.keyArr = [];
            for (var key in this.bodyData) {
              console.log(key);
              this.keyArr.push(key);
              this.adcviceArr.push(this.bodyData[key]);
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
   * 标题颜色
   */
  btys(i: any) {
    console.log(i);
    if (i === '拟办部门意见') {
      return '#4877FB';
    } else if (i === '局领导批示') {
      return '#F87A85';
    } else if (i === '主办意见') {
      return '#67C554';
    } else {
      return '#4877FB';
    }
  }
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
