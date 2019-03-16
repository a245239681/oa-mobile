import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'app-handover-person-select',
  templateUrl: './handover-person-select.page.html',
  styleUrls: ['./handover-person-select.page.scss']
})
export class HandoverPersonSelectPage implements OnInit {
  /**
   * 传过来的模型
   */
  itemmodel: any;
  hasSelected: any; // 自动勾选已选列表
  // 选中人员
  selectPerson: any;
  commitType: string;
  constructor(
    private nav: NavController,
    private mainservice: MainindexService,
    private activeRoute: ActivatedRoute,
    private toast: CommonHelper,
    private route: Router
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      // console.log(params);
      this.itemmodel = JSON.parse(params['item']);
      // this.IsShowNextStep = this.itemmodel['IsShowNextStep'];
      console.dir(this.itemmodel);
      this.hasSelected = JSON.parse(params['hasSelected']);
      // console.log('已选数据');
      console.log(this.hasSelected);
      this.toast.dismissLoading();
    });
  }
  hostSelected(items: any) {
    console.log(items);
    this.selectPerson = items.map(res => {
      return res['Id'];
    });
    console.log(this.itemmodel);
  }
  ngOnInit() {
    this.mainservice
      .ValidMove(
        this.itemmodel['Id'],
        this.itemmodel.ProcessType,
        this.itemmodel.CoorType
      )
      .subscribe(res => {
        if (res.State === 1) {
          this.commitType = '60';
        }
      });
  }
  /** 提交 */
  handin() {
    const params = {
      id: this.itemmodel['Id'],
      //主办id 单选
      nextUserId: this.selectPerson.length > 0 ? this.selectPerson.join() : '',
      primaryDeptId: '',
      cooperaters: [],
      readers: [],
      //模态框
      commitType: this.commitType,

      CoorType: this.itemmodel['CoorType'],

      ProcessType: this.itemmodel['ProcessType']
    };
    // const cmdata = JSON.stringify(params);
    this.mainservice.MoveCommit(params).subscribe(res => {
      console.log(res);
    });
  }
  /**
   * 返回
   */
  canGoBack() {
    this.nav.back();
  }
}
