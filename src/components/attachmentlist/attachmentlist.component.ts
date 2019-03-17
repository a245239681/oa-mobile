import { CommonHelper } from './../../infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { getFileMimeType } from 'src/infrastructure/regular-expression';

@Component({
  selector: 'app-attachmentlist',
  templateUrl: './attachmentlist.component.html',
  styleUrls: ['./attachmentlist.component.scss']
})
export class AttachmentlistComponent implements OnInit {
  // 传进来的itemmodel
  @Input() itemmodel: any;

  attachmentlistArr: any[] = [];

  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    private mainservice: MainindexService,
    private commonHelper: CommonHelper,
    private browser: InAppBrowser,
    private platform: Platform,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File,
  ) { }

  ngOnInit() {
    this.getattchmentlis();
  }

  /**
   * 获取附件
   */
  getattchmentlis() {
    this.mainservice.getattchmentlist(this.itemmodel['Id']).subscribe(
      res => {
        console.log(res);
        if (res['State'] === 1) {
          this.attachmentlistArr = res['Data'];
          console.log(this.attachmentlistArr);
        } else {
          // this.toast.presentToast('暂无数据');
        }
      },
      err => {
        this.commonHelper.presentToast('请求失败');
      }
    );
  }

  /**
   * 点击跳到浏览器浏览附件
   * @param item
   */
  previewerAttchment(item: any) {
    if (this.platform.is('android') || this.platform.is('ios')) {
      const uri = encodeURI(item['Url']); // 文件的地址链接
      const fileUrl = this.file.cacheDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址
      this.commonHelper.presentLoading();
      this.fileTransfer.download(uri, fileUrl).then(entry => {
        entry.file(data => {
          console.log(data);
          this.fileOpener.open(fileUrl, getFileMimeType(item.Extended))
            .then(() => this.commonHelper.dismissLoading())
            .catch(() => {
              this.commonHelper.dismissLoading();
              this.commonHelper.presentToast('文件打开失败，请安装WPS');
            }); // showOpenWithDialog使用手机上安装的程序打开下载的文件
        });
      }, () => {
        this.commonHelper.dismissLoading();
        this.commonHelper.presentToast('文件下载失败');
      });

      return;
    }
    const browser = this.browser.create(item['Url']);
    browser.show();
  }
}
