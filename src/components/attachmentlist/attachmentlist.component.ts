import { CommonHelper } from './../../infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-attachmentlist',
  templateUrl: './attachmentlist.component.html',
  styleUrls: ['./attachmentlist.component.scss'],
})
export class AttachmentlistComponent implements OnInit {

  //传进来的itemmodel
  @Input() itemmodel:any;

  attachmentlistArr:any[] = [];

  constructor(private mainservice: MainindexService,private toast: CommonHelper,private browser: InAppBrowser) { 
    
  }

  ngOnInit() {
    this.getattchmentlis();
  }

  /**
   * 获取附件
   */
  getattchmentlis() {
    this.mainservice.getattchmentlist(this.itemmodel['Id']).subscribe((res) => {
      console.log(res);
      if (res['State'] == 1) {
        this.attachmentlistArr = res['Data'];
        console.log(this.attachmentlistArr);
      }else {
        this.toast.presentToast('暂无数据');
      }
    },err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 点击跳到浏览器浏览附件
   * @param item 
   */
  previewerAttchment(item: any) {
    const browser = this.browser.create(item['Url']);
    browser.show();
  }
}
