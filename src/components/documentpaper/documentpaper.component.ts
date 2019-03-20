import { Component, OnInit, Input } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ModalController } from '@ionic/angular';
import { DocumentRelatedPage } from 'src/pages/document-related/document-related.page';

@Component({
  selector: 'app-documentpaper',
  templateUrl: './documentpaper.component.html',
  styleUrls: ['./documentpaper.component.scss']
})
export class DocumentpaperComponent implements OnInit {
  // 传进来的itemmodel
  @Input() itemmodel: any;
  attachmentlistArr: any;
  isData: boolean;
  constructor(
    private mainindexService: MainindexService,
    private toast: CommonHelper,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.RelationTree();
  }
  RelationTree() {
    this.mainindexService.RelationTree(this.itemmodel['Id']).subscribe(
      res => {
        if (res['State'] === 1) {
          this.attachmentlistArr = res['Data'];
          this.isData = this.attachmentlistArr['length'] > 0 ? true : false;
        }
      },
      err => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  async toDetail(d?: any) {
    d.documenttype = 1;
    // componentProps 传值 d:数据
    const modal = await this.modalController.create({
      component: DocumentRelatedPage,
      componentProps: { itemmodel: d }
    });
    await modal.present();
    // 接收模态框传回的值
    const data = await modal.onDidDismiss();
  }
}
