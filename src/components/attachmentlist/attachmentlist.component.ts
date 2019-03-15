import { CommonHelper } from './../../infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit, Input } from '@angular/core';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file/ngx';

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
          this.commonHelper.presentToast('暂无数据');
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
    if (this.platform.is('android')) {
      const uri = encodeURI(item['Url']); // 文件的地址链接
      const fileUrl = this.file.dataDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址
      this.commonHelper.presentLoading();
      this.fileTransfer.download(uri, fileUrl).then(entry => {
        entry.file(data => {
          console.log(data);
          this.fileOpener.open(fileUrl, this.getFileMimeType(item.Extended))
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

  /**
   * 获取文件后缀名
   * @param fileName 文件名
   */
  getFileType(fileName: string): string {
    return fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length).toLowerCase();
  }

  /**
   * 获取文件类型
   * @param fileType 文件后缀名
   */
  getFileMimeType(fileType: string): string {
    let mimeType: string = '';

    switch (fileType) {
      case 'txt':
        mimeType = 'text/plain';
        break;
      case 'docx':
        mimeType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
        break;
      case 'doc':
        mimeType = 'application/msword';
        break;
      case 'pptx':
        mimeType = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      case 'ppt':
        mimeType = 'application/vnd.ms-powerpoint';
        break;
      case 'xlsx':
        mimeType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
        break;
      case 'xls':
        mimeType = 'application/vnd.ms-excel';
        break;
      case 'zip':
        mimeType = 'application/x-zip-compressed';
        break;
      case 'rar':
        mimeType = 'application/octet-stream';
        break;
      case 'pdf':
        mimeType = 'application/pdf';
        break;
      case 'jpg':
        mimeType = 'image/jpeg';
        break;
      case 'png':
        mimeType = 'image/png';
        break;
      default:
        mimeType = 'application/' + fileType;
        break;
    }
    return mimeType;
  }
}
