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
    this.ValidBack();
    this.getData();
  }
  singleSelect(item: any, data: string) {
    console.log(item);
    this.selectPerson = item['Id'];
    this.NextActionId = data;
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
        this.itemmodel['coorType']
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
  getData() {
    this.mainservice
      .getBackActionTree(this.itemmodel['Id'], this.itemmodel['ProcessType'])
      .subscribe(
        res => {
          console.log(res);
          if (res['State'] === 1) {
            this.tree = res['Data']['BackAllTree'];
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
    const params = {
      id: this.itemmodel['Id'],
      // 主办id 单选
      NextActionId: this.NextActionId,
      nextUserId: this.selectPerson.length > 0 ? this.selectPerson : '',
      primaryDeptId: '',
      cooperaters: [],
      readers: [],
      // 模态框
      commitType: this.commitType,

      CoorType: this.itemmodel['CoorType'],

      ProcessType: this.itemmodel['ProcessType']
    };
    this.mainservice.MoveCommit(params).subscribe(res => {
      if (res['State'] === 1) {
        this.toast.presentToast('退回成功');
        this.route.navigate(['tabs']);
      } else {
        this.toast.presentToast(res['Message']);
      }
    });
  }
}
