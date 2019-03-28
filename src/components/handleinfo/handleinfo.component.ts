import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from './../../service/maiindex/mainindex.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-handleinfo',
  templateUrl: './handleinfo.component.html',
  styleUrls: ['./handleinfo.component.scss']
})
export class HandleinfoComponent implements OnInit {
  /** 业务详情 */
  @Input() itemmodel: any;
  /** 页面信息 */
  @Input() itemmodelData: any;

  // 意见数组
  adcviceArr: any[] = [];

  // 标题
  header: any;

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

  constructor(
    private mainindexService: MainindexService,
    public commonHelper: CommonHelper
  ) {}

  ngOnInit() {
    /** 判断是否是相关公文 true：是 */
    if (this.itemmodel.isRelated) {
      this.commonHelper.presentLoading();
      this.mainindexService
        .getallAttitudeList(
          this.itemmodel['TargetId'],
          this.itemmodel['ProcessType'],
          this.itemmodel['CoorType']
        )
        .subscribe(
          res => {
            this.commonHelper.dismissLoading();
            if (res['State'] === 1) {
              this.bodyData = res['Data']['BodyData'];
              this.header = res['Data']['Header'];
              // this.header.FinishDate =
              //   this.header.FinishDate.replace('-', '年').replace('-', '月') +
              //   '日';
              this.adcviceArr = [];
              this.keyArr = [];
              // tslint:disable-next-line:forin
              for (const key in this.bodyData) {
                this.keyArr.push(key);
                this.adcviceArr.push(this.bodyData[key]);
              }
            } else {
              this.commonHelper.presentToast('暂无数据');
            }
          },
          err => {
            this.commonHelper.presentToast('请求失败');
          }
        );
    } else {
      // this.getdata();
      this.bodyData = this.itemmodelData.BodyData;
      this.header = this.itemmodelData.Header;
      // this.header.FinishDate =
      //   this.header.FinishDate.replace('-', '年').replace('-', '月') +
      //   '日';
      this.adcviceArr = [];
      this.keyArr = [];
      // tslint:disable-next-line:forin
      for (const key in this.bodyData) {
        this.keyArr.push(key);
        this.adcviceArr.push(this.bodyData[key]);
      }
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
