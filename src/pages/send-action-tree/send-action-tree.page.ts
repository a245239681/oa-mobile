import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import {
  MainindexService,
  LastSendActionStepModel
} from 'src/service/maiindex/mainindex.service';

@Component({
  selector: 'app-send-action-tree',
  templateUrl: './send-action-tree.page.html',
  styleUrls: ['./send-action-tree.page.scss']
})
export class SendActionTreePage implements OnInit {
  treeData = [];

  itemmodel: any;

  //列表数组
  dataArr: any;

  //层数目
  floor: number;

  selectItem: any = {};

  constructor(
    private mainservice: MainindexService,
    private activeRouter: ActivatedRoute,
    private toast: CommonHelper,
    private route: Router
  ) {
    this.activeRouter.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
    });
  }

  ngOnInit() {
    this.getdata();
  }

  singleselect(item: TreeItem, data, event) {
    event.stopPropagation();
    if (item.data.Type === 2) {
      this.selectItem.checked = false;
      item.checked = true;
      this.selectItem = item.data;
      // this.dataArr = item.value;
      if (Number(data).toString() === 'NaN') {
        this.dataArr = this.treeData[0]['value'];
      } else {
        this.dataArr = data;
      }
    } else {
      item.expanded = !item.expanded;
    }
  }

  generateData(item): TreeItem {
    return {
      value: item.Id,
      text: item.Label,
      data: item,
      children: item.Children.map(p => this.generateData(p))
    };
  }

  async getdata() {
    this.toast.presentLoading();
    let res: any = await this.mainservice
      .GetActionTreeSend(this.itemmodel['Id'], this.itemmodel['ProcessType'])
      .toPromise();
    // .subscribe((res: any) => {
    this.toast.dismissLoading();
    if (res.State === 1) {
      this.floor = res.Data[0].Type === 2 ? 2 : 3;
      this.treeData = res.Data.map(p => this.generateData(p));
    }

    return;
    if (res['State'] == 1) {
      this.dataArr = res['Data'];
      if (this.dataArr.length > 0) {
        var tempArr = <any[]>this.dataArr[0]['Children'];

        if (tempArr.length > 0) {
          var item = tempArr[0];
          if (item['Type'] == 2) {
            this.floor = 2;
          } else {
            this.floor = 3;
          }
        }
      }
    }
    // });
  }

  //提交
  handinclick() {
    // LastSendActionStep
    if (!this.selectItem) {
      this.toast.presentToast('请先选择');
      return;
    }
    var handlemodel = <LastSendActionStepModel>{
      id: this.itemmodel['Id'],
      NextActionId: this.dataArr ? this.dataArr : '',
      NextUserId: this.selectItem ? this.selectItem['Id'] : '',
      commitType: this.itemmodel['commitType'],
      ProcessType: this.itemmodel['ProcessType'],
      CoorType: this.itemmodel['CoorType']
    };
    this.toast.presentLoading();
    this.mainservice.LastSendActionStep(handlemodel).subscribe(res => {
      this.toast.dismissLoading();
      if (res['State'] == 1) {
        this.toast.presentToast('提交成功');
        this.route.navigate(['tabs']);
      }
    });
  }
}

export class TreeItem {
  value: string;
  text: string;
  data?: any;
  checked?: boolean;
  expanded?: boolean;
  parent?: TreeItem;
  children: TreeItem[];
}
