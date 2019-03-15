import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';

@Component({
  selector: 'app-return-back',
  templateUrl: './return-back.page.html',
  styleUrls: ['./return-back.page.scss'],
})
export class ReturnBackPage implements OnInit {

  itemmodel: any;
  tree: any[];

  constructor(
    private mainservice: MainindexService,
    private nav: NavController,
    private activeRouter: ActivatedRoute,
    private commonHelper: CommonHelper,
  ) {
    this.activeRouter.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
    });
  }

  ngOnInit() {
    this.getData();
  }

  getData() {
    this.mainservice.getBackActionTree(this.itemmodel['Id'], this.itemmodel['ProcessType']).subscribe((res) => {
      console.log(res);
      if (res['State'] === 1) {
        this.tree = res['Data']['BackAllTree'];
      } else {
        this.commonHelper.presentToast('已无数据');
      }
    }, () => {
      this.commonHelper.presentToast('请求失败');
    });
  }

  canGoBack() {
    this.nav.back();
  }
}
