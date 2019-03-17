import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController, Platform } from '@ionic/angular';
import { FileOpener } from '@ionic-native/file-opener/ngx';
import { File } from '@ionic-native/file/ngx';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { getFileMimeType } from 'src/infrastructure/regular-expression';
import { API_URL } from 'src/infrastructure/host-address';
import { ApiUrlManagement } from 'src/infrastructure/api-url-management';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-documentdetail',
  templateUrl: './documentdetail.page.html',
  styleUrls: ['./documentdetail.page.scss']
})
export class DocumentdetailPage implements OnInit {
  /**
   * 列表传进来的item
   */
  itemmodel: any;

  // 标题切换
  title = '办理信息';

  /**
   * 1 办理信息 2 流转信息 3 办文签  4 附件列表
   */
  type = '1';

  // 收发文类型 1 收文 2 发文 3 传阅
  documenttype: number;

  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private nav: NavController,
    private browser: InAppBrowser,
    private platform: Platform,
    private fileOpener: FileOpener,
    private file: File,
    private transfer: FileTransfer,
    private commonHelper: CommonHelper,
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.itemmodel = JSON.parse(params['item']);
    });
    /** 拟办意见的显示隐藏 */
  }

  ngOnInit() { }

  nbyj() {
    if (this.type === '1') {
      if (
        this.itemmodel['Operationlist'] !== '已办收文' &&
        this.itemmodel['Operationlist'] !== '已办发文'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  segmentChanged(event: any) {
    console.log('Segment changed', event.target.value);
    this.type = event.target.value;
    switch (event.target.value) {
      case '1':
        this.title = '办理信息';
        break;
      case '2':
        this.title = '流转信息';
        break;
      case '3':
        this.title = '附件管理';
        break;
      case '4':
        this.title = '办文签';
        break;
      case '5':
        this.title = '发文签';
        break;
      case '6':
        this.title = '正文';
        this.previewerAttchment(this.itemmodel['Id']);
        break;
      default:
        this.title = '相关公文';
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
    const url = environment.url + ApiUrlManagement.fileViewSends + '?relationId=' + relationId;
    console.log(url);
    if (this.platform.is('android') || this.platform.is('ios')) {
      const uri = encodeURI(url); // 文件的地址链接
      const fileUrl = this.file.cacheDirectory + uri.substr(uri.lastIndexOf('/') + 1); // 文件的下载地址
      this.commonHelper.presentLoading();
      this.fileTransfer.download(uri, fileUrl).then(entry => {
        entry.file((data: any) => {
          console.log(data);
          this.fileOpener.open(fileUrl, getFileMimeType('pdf'))
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
    const browser = this.browser.create(url);
    browser.show();
  }

  pushtoadvice() {
    this.itemmodel['IsShowNextStep'] = true;
    this.route.navigate(['submission'], {
      queryParams: {
        item: JSON.stringify(this.itemmodel)
      }
    });
  }

  /**
   * 返回
   */
  canGoBack() {
    history.back();
    return false;
  }
}
