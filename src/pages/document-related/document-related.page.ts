import { Component, OnInit, Input } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiUrlManagement } from 'src/infrastructure/api-url-management';
import { Platform, ModalController } from '@ionic/angular';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { File } from '@ionic-native/file/ngx';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { getFileMimeType } from 'src/infrastructure/regular-expression';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-document-related',
  templateUrl: './document-related.page.html',
  styleUrls: ['./document-related.page.scss']
})
export class DocumentRelatedPage implements OnInit {
  @Input() itemmodel: any;
  fileTransfer: FileTransferObject = this.transfer.create();
  type = '1';
  title: string;
  constructor(
    private platform: Platform,
    private file: File,
    private commonHelper: CommonHelper,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private browser: InAppBrowser,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    console.log(this.itemmodel);
    this.itemmodel.isRelated = true;
  }
  segmentChanged(event: any) {
    console.log('Segment changed', event.target.value);
    this.type = event.target.value;
    switch (event.target.value) {
      case '1':
        this.title = '办理信息';
        break;
      case '6':
        this.title = '正文';
        this.previewerAttchment(this.itemmodel['Id']);
        break;
    }
  }
  openDocument() {
    this.previewerAttchment(this.itemmodel['Id']);
  }

  /**
   * 点击跳到浏览器浏览正文
   * @param relationId Id
   */
  previewerAttchment(relationId: string) {
    const url =
      environment.url +
      ApiUrlManagement.fileViewSends +
      '?relationId=' +
      relationId;
    console.log(url);
    if (this.platform.is('android') || this.platform.is('ios')) {
      const uri = encodeURI(url); // 文件的地址链接
      const fileUrl =
        this.file.cacheDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址
      this.commonHelper.presentLoading();
      this.fileTransfer.download(uri, fileUrl).then(
        entry => {
          entry.file((data: any) => {
            console.log(data);
            this.fileOpener
              .open(fileUrl, getFileMimeType('pdf'))
              .then(() => this.commonHelper.dismissLoading())
              .catch(() => {
                this.commonHelper.dismissLoading();
                this.commonHelper.presentToast('文件打开失败，请安装WPS');
              }); // showOpenWithDialog使用手机上安装的程序打开下载的文件
          });
        },
        () => {
          this.commonHelper.dismissLoading();
          this.commonHelper.presentToast('文件下载失败');
        }
      );

      return;
    }
    const browser = this.browser.create(url);
    browser.show();
  }
  /** 关闭模态框 */
  closemodal(data?: any) {
    this.modalController.dismiss({
      result: data
    });
  }
}
