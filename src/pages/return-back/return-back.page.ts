import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';

@Component({
  selector: 'app-return-back',
  templateUrl: './return-back.page.html',
  styleUrls: ['./return-back.page.scss']
})
export class ReturnBackPage implements OnInit {
  itemmodel: any;
  tree: any[];
  selectPerson: string;
  commitType: string;
  NextActionId: string;
  selectItem: any = {};
  constructor(
    private mainservice: MainindexService,
    private nav: NavController,
    private activeRouter: ActivatedRoute,
    private toast: CommonHelper,
    private route: Router
  ) {
    this.activeRouter.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
    });
  }

  ngOnInit() {
    // this.ValidBack();
    this.getData();
  }
  // singleselect(item, data, event) {
  //   event.stopPropagation();
  //   if (item.data.Type === 2) {
  //     this.selectItem.checked = false;
  //     item.checked = true;
  //     this.selectItem = item;
  //   } else {
  //     item.expanded = !item.expanded;
  //   }
  // }

  singleSelect(item: any, data: string, event) {
    event.stopPropagation();
    console.log(item);

    if (item.data.Type === 2) {
      this.selectItem.checked = false;
      item.checked = true;
      this.selectItem = item;
      this.selectPerson = item['value'];
      this.NextActionId = data;
      console.log(this.selectPerson);
      console.log(this.NextActionId);
    } else {
      item.expanded = !item.expanded;
    }

    // this.selected.emit({ items: [item] });
  }
  ionSelect(item, e) {
    console.log(item);
    console.log(e);
  }
  ValidBack() {
    this.mainservice
      .ValidBack(
        this.itemmodel['Id'],
        this.itemmodel['ProcessType'],
        this.itemmodel['CoorType']
      )
      .subscribe(
        res => {
          console.log(res);
          if ((<any>res).State === 1) {
            this.commitType = '40';
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
  }

  generateData(item) {
    return {
      value: item.Id,
      text: item.Label,
      data: item,
      children: item.Children.map(p => this.generateData(p))
    };
  }

  getData() {
    this.mainservice
      .getBackActionTree(this.itemmodel['Id'], this.itemmodel['ProcessType'])
      .subscribe(
        (res: any) => {
          console.log(res);
          if (res['State'] === 1) {
            this.tree = res.Data.BackAllTree.map(p => this.generateData(p));
            console.log(this.tree);

            // this.tree = res['Data']['BackAllTree'];
          } else {
            this.toast.presentToast('已无数据');
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
  }
  commit() {
    const parms = {
      id: this.itemmodel['Id'],
      // 主办id 单选
      NextActionId: this.NextActionId,
      nextUserId: this.selectPerson.length > 0 ? this.selectPerson : '',
      primaryDeptId: '',
      cooperaters: [],
      readers: [],
      // 模态框
      commitType: '40',

      CoorType: this.itemmodel['CoorType'],

      ProcessType: this.itemmodel['ProcessType']
    };
    console.log(parms);
    this.mainservice.MoveCommit(parms).subscribe(res => {
      if (res['State'] === 1) {
        this.toast.presentToast('退回成功');
        this.nav.navigateBack(['tabs']);
      } else {
        this.toast.presentToast(res['Message']);
      }
    });
  }
}
