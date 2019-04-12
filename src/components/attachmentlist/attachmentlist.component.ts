import { CommonHelper } from './../../infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform, LoadingController } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import {
  FileTransfer,
  FileTransferObject
} from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';
import { getFileMimeType } from 'src/infrastructure/regular-expression';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-attachmentlist',
  templateUrl: './attachmentlist.component.html',
  styleUrls: ['./attachmentlist.component.scss']
})
export class AttachmentlistComponent implements OnInit, OnDestroy {
  /** 业务详情 */
  @Input() itemmodel: any;
  /** 页面信息 */
  @Input() itemmodelData: any;

  /** 附件列表 */
  attachmentlistArr: any[] = [];

  /** 附件的下载 */
  fileTransfer: FileTransferObject = this.transfer.create();

  loading: HTMLIonLoadingElement;

  constructor(
    private mainservice: MainindexService,
    private commonHelper: CommonHelper,
    private browser: InAppBrowser,
    private platform: Platform,
    private fileOpener: FileOpener,
    private transfer: FileTransfer,
    private file: File,
    private loadingCtrl: LoadingController
  ) { }

  ngOnInit() {
    this.getattchmentlis();
  }

  recurrence(item: any) {

    if (item.children.length < 1) {

      return;
    }else {
      item.children.forEach(element => {

        this.recurrence(element);
      });
    }
  } 

  /**
   * 获取附件
   */
  getattchmentlis() {
    this.mainservice.getattchmentlist(this.itemmodel['Id']).subscribe(
      res => {
        if (res['State'] === 1) {
          // this.attachmentlistArr = this.itemmodelData;
          this.attachmentlistArr = res['Data'];
          // if (this.attachmentlistArr.length === 1) {
          //   // 如果附件只有1条则自动打开
          //   this.previewerAttchment(this.attachmentlistArr[0]);
          // }
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
   * @param item 1
   */
  async previewerAttchment(item: any) {
    const mimeType = getFileMimeType(item.Extended);
    if (mimeType === '') {
      this.commonHelper.presentToast('不支持该格式文件预览');
      return;
    }

    var arrUrl = item.Url.split("//");
    var filelink = arrUrl.length >= 3 ? arrUrl[2] : '';
    if (this.platform.is('android') || this.platform.is('ios')) {


      if (filelink === '') {
        this.commonHelper.presentToast('打开文件出错，请重新上传');
        return;
      }

      const uri = encodeURI(environment.url + filelink); // 文件的地址链接
      
      const fileUrl =
        this.file.cacheDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址

      this.loading = await this.loadingCtrl.create({
        message: '正在加载：0%',
        translucent: true,
        spinner: 'bubbles',
        mode: 'ios',
        cssClass: 'logading-class'
      });
      await this.loading.present();

      let no = 1;

      this.fileTransfer.onProgress(progressEvent => {
        if (progressEvent.lengthComputable) {
          no = (progressEvent.loaded / progressEvent.total) * 100;
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
          entry.file(data => {
            this.fileOpener
              .open(fileUrl, getFileMimeType(item.Extended))
              .then(() => this.loading.dismiss())
              .catch(() => {
                this.loading.dismiss();
                this.commonHelper.presentToast('不支持该格式文件预览');
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
    const browser = this.browser.create(environment.url + filelink);
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
}
