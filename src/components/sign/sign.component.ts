import { Component, OnInit, Input } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  /** 业务详情 */
  @Input() itemmodel: any;
  /** 页面信息 */
  @Input() itemmodelData: any;
  myData: any;
  /** 标题 */
  title: string;
  /** 正文模板 */
  templateType: string;
  constructor(
    public mainindexService: MainindexService,
    private toast: CommonHelper
  ) {}

  ngOnInit() {
    console.log(this.itemmodelData);
    if (this.itemmodel.documenttype === 1) {
      this.title = '收文登记表';
      // this.GetReceiveData(this.itemmodel.Id);
      this.myData = this.itemmodelData;
    } else if (this.itemmodel.documenttype === 2) {
      this.title = '发文拟稿';
      // this.GetSendModelById(this.itemmodel.Id);
      this.myData = this.itemmodelData.sendData;
      this.templateType = this.itemmodelData.templateType;
      if (typeof this.myData.TypeStr === 'string') {
        this.myData.TypeStr = this.myData.TypeStr
          ? JSON.parse(this.myData.TypeStr)
          : '';
      }
    }
  }

  /** 请求发文笺详情 */
  GetSendModelById(Id?: string) {
    this.mainindexService.GetSendModelById(Id).subscribe(r => {
      if (r['State'] === 1) {
        this.myData = r['Data'];
        this.templateType = r['templateType'];
        this.myData.TypeStr = JSON.parse(this.myData.TypeStr);
      } else {
        this.toast.presentToast('暂无数据');
      }
    });
  }
  /** 请求办文笺详情 */
  GetReceiveData(Id: string) {
    this.mainindexService.GetReceiveData(Id).subscribe(r => {
      if (r) {
        this.myData = r;
      } else {
        this.toast.presentToast('暂无数据');
      }
    });
  }
}
