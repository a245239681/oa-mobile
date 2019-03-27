import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiUrlManagement } from 'src/infrastructure/api-url-management';
import { Platform, ModalController, LoadingController } from '@ionic/angular';
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
export class DocumentRelatedPage implements OnInit, OnDestroy {
  @Input() itemmodel: any;
  fileTransfer: FileTransferObject = this.transfer.create();
  type = '1';
  title: string;
  loading: HTMLIonLoadingElement;
  constructor(
    private platform: Platform,
    private file: File,
    private commonHelper: CommonHelper,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private browser: InAppBrowser,
    private modalController: ModalController,
    private loadingCtrl: LoadingController,
  ) { }

  ngOnInit() {
    this.itemmodel.isRelated = true;
  }
  segmentChanged(event: any) {
    this.type = event.target.value;
    switch (event.target.value) {
      case '1':
        this.title = '办理信息';
        break;
      case '6':
        this.title = '正文';
        this.previewerAttchment(this.itemmodel['TargetId']);
        break;
    }
  }
  openDocument() {
    this.previewerAttchment(this.itemmodel['TargetId']);
  }

  /**
   * 点击跳到浏览器浏览正文
   * @param relationId Id
   */
  async previewerAttchment(relationId: string) {
    const url =
      environment.url +
      ApiUrlManagement.fileViewSends +
      '?relationId=' +
      relationId;
    if (this.platform.is('android') || this.platform.is('ios')) {
      const uri = encodeURI(url); // 文件的地址链接
      const fileUrl =
        this.file.cacheDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址


      this.loading = await this.loadingCtrl.create({
        message: '正在加载：0%',
        translucent: true,
        spinner: 'bubbles',
        mode: 'ios',
        cssClass: 'logading-class',
      });
      await this.loading.present();

      let no = 1;

      this.fileTransfer.onProgress((progressEvent) => {
        if (progressEvent.lengthComputable) {
          no = progressEvent.loaded / progressEvent.total * 100;
        }
      });

      const timer = setInterval(() => {
        this.loading.message = '正在加载：' + Math.floor(no) + '%';
        if (no >= 99) {
          clearInterval(timer);
        }
      }, 300);

      this.fileTransfer.download(uri, fileUrl).then(
        entry => {
          entry.file((data: any) => {
            this.fileOpener
              .open(fileUrl, getFileMimeType('pdf'))
              .then(() => this.loading.dismiss())
              .catch(() => {
                this.loading.dismiss();
                this.commonHelper.presentToast('文件打开失败，请安装WPS');
              }); // showOpenWithDialog使用手机上安装的程序打开下载的文件
          });
        },
        () => {
          this.loading.dismiss();
          this.commonHelper.presentToast('文件下载失败');
        }
      );

      return;
    }
    const browser = this.browser.create(url);
    browser.show();
  }

  ngOnDestroy(): void {
    if (this.loading) {
      this.loading.dismiss();
    }
    if (this.fileTransfer) {
      this.fileTransfer.abort();
    }
  }

  /** 关闭模态框 */
  closemodal(data?: any) {
    this.modalController.dismiss({
      result: data
    });
  }
}
