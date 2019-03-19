import { Component, OnInit, Input } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  @Input() itemmodel: any;
  myData: any;
  title: string;
  templateType: string;
  constructor(
    public mainindexService: MainindexService,
    private toast: CommonHelper
  ) {
    console.log('构造函数');
  }

  ngOnInit() {
    console.log(this.itemmodel);
    if (this.itemmodel.documenttype === 1) {
      this.title = '收文登记表';
      this.GetReceiveData(this.itemmodel.Id);
    } else if (this.itemmodel.documenttype === 2) {
      this.title = '发文拟稿';
      this.GetSendModelById(this.itemmodel.Id);
    }
  }

  /** 请求发文笺详情 */
  GetSendModelById(Id: string) {
    this.mainindexService.GetSendModelById(Id).subscribe(
      r => {
        if (r['State'] === 1) {
          this.myData = r['Data'];
          this.templateType = r['templateType'];
          this.myData.TypeStr = JSON.parse(this.myData.TypeStr);
          console.log(this.myData);
        } else {
          this.toast.presentToast('暂无数据');
        }
        console.log(r);
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }
  /** 请求办文笺详情 */
  GetReceiveData(Id: string) {
    this.mainindexService.GetReceiveData(Id).subscribe(
      r => {
        if (r['State'] === 1) {
          this.myData = r['Data'];
          this.templateType = r['templateType'];
          this.myData.TypeStr = JSON.parse(this.myData.TypeStr);
          console.log(this.myData);
        } else {
          this.toast.presentToast('暂无数据');
        }
        console.log(r);
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }
}
