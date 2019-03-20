import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  MainindexService,
  lasthandinStepModel,
  PendingReaderModel
} from './../../service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-person-select',
  templateUrl: './person-select.page.html',
  styleUrls: ['./person-select.page.scss']
})
export class PersonSelectPage implements OnInit {
  /**
   * 传过来的模型
   */
  itemmodel: any;
  /** 是否是传阅件 */
  DealType = true;

  handleModel: lasthandinStepModel;

  type = 1;

  isDepartmentSelect = true;

  // 记录主办的数组
  // 记录主办的数组
  hostArr: any[] = [];

  // 记录协办数组
  coorperationArr: any[] = [];

  // 记录传阅的数组
  readerArr: any[] = [];

  // 记录下一步的数组
  nextArr: any[] = [];

  hasSelected: any; // 自动勾选已选列表

  // 下一步是否选了到拟办
  IsSelectNiBan = false;

  // 是否显示下一步
  IsShowNextStep = true;

  constructor(
    private nav: NavController,
    private mainservice: MainindexService,
    private activeRoute: ActivatedRoute,
    private toast: CommonHelper,
    private route: Router,
    public modalController:ModalController
  ) {
    // this.itemmodel = navParams.data.item;
    // this.hasSelected = navParams.data.hasSelected;

    // this.IsShowNextStep = this.itemmodel['IsShowNextStep'];

    // this.toast.dismissLoading();
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
      this.IsShowNextStep = this.itemmodel['IsShowNextStep'];
      this.hasSelected = JSON.parse(params['hasSelected']);
      this.toast.dismissLoading();

      //为了确保用户不做任何操作提交参数没有值需要进行组装模拟数据
      this.hostArr = this.hasSelected.PrimaryDeptId ? this.hasSelected.PrimaryDeptId: [];
      this.coorperationArr = this.hasSelected.Cooperaters ? this.hasSelected.Cooperaters: [];
      this.nextArr = this.hasSelected.Leaders ? this.hasSelected.Leaders: [];
      //组装传阅数据
      this.readerArr = this.hasSelected.Readers ? this.hasSelected.Readers: [];
    });
  }

  ngOnInit() {
    if (this.itemmodel.DealType === '传阅件') {
      this.DealType = false;
    }
  }

  segmentChanged(event: any) {
    switch (event.detail.value) {
      case '1': // 主办
        this.type = 1;
        this.isDepartmentSelect = true;
        break;
      case '2': // 协办
        this.type = 2;
        this.isDepartmentSelect = true;
        break;
      case '3': // 传阅
        this.type = 3;
        break;
      case '4': // 下一步
        this.type = 4;
        break;
    }
  }

  hostSelected(items: any[], selectType:string) {
    //单选直接该数据
    if (selectType == '1') {
      this.hostArr = items;
      var temp = [];
      for (var i = 0; i < this.hostArr.length; i ++) {
        temp.push(this.hostArr[i].id);
      }
      this.hostArr = temp;
      console.log(this.hostArr);
    } else if (selectType == '2') {
      this.coorperationArr = items;
      var temp = [];
      for (var i = 0; i < this.coorperationArr.length; i ++) {
        temp.push(this.coorperationArr[i].id);
      }
      this.coorperationArr = temp;
      console.log(this.coorperationArr);
    }
  }

  //state 0 下一步 1 传阅  
  nextSelected(items: any, leaderChecked: boolean, nbChecked: boolean,state:string) {

    console.log(leaderChecked)
    console.log(nbChecked);
    // 如果是传阅
    if (state == '1') {
      // 组装传阅数组
      this.readerArr = [];
      // 组装选中的部门为模型
      if (items['deptId'].length > 0) {
        for (let i = 0; i < items['deptId'].length; i++) {
          const departmentModel = <PendingReaderModel>{
            staffId: '',
            deptId: items['deptId'][i]
          };
          this.readerArr.push(departmentModel);
        }
      }
      // 组装选中的人为模型
      if (items['staffId'].length > 0) {
        for (let i = 0; i < items['staffId'].length; i++) {
          const departmentModel = <PendingReaderModel>{
            staffId: items['staffId'][i],
            deptId: ''
          };
          this.readerArr.push(departmentModel);
        }
      }
    } else if (state == '0') {
      // 先直接拿到人的id数组  如果有部门id返回的话 就拿到部门里面的所有人的id
      this.nextArr = items['staffId'];
      if (items['deptId'].length > 0) {
        for (let i = 0; i < items['deptId'].length; i++) {
          this.mainservice.getDeptTreeCY(items['deptId'][i]).subscribe(res => {
            if (res['State'] == 1) {
              let tempArr = <any[]>res['Data'];
              tempArr = tempArr.map(item => {
                return item['id'];
              });
              tempArr.forEach(id => {
                this.nextArr.push(id);
              });
            }
          });
        }
      }
      // 下一步数据在此组装完毕
    }
    //下一步
    if (state == '0') {
      this.IsSelectNiBan = nbChecked;
    }
  }

  /**
   * 返回
   */
  canGoBack() {
    this.nav.back();
  }

  /**
   * 提交
   */
  handin() {
    if (this.hostArr.length > 0 && this.coorperationArr.length > 0) {
      var hostid = this.hostArr[0];
      for (var i = 0 ; i < this.coorperationArr.length ; i++) {
        if (this.coorperationArr[i] == hostid) {
          this.toast.presentToast('主办和协办不能同时选择同一个部门');
          return;
        }
      }
    }

    if (this.itemmodel.ItemActionName === '拟办') {

      if (this.nextArr.length <= 0 && this.DealType) {
        this.toast.presentToast('请在下一步中选择');
        return;
      }
      
    }

    if (this.itemmodel.ItemActionName === '部门处理') {
      if (this.hostArr.length <= 0) {
        this.toast.presentToast('请选择主办部门');
        return;
      }
      if (this.coorperationArr.length <= 0) {
        this.toast.presentToast('请选择协办部门');
        return;
      }
    }

    // 如果是拟办到拟办 commotType改为600)
    if (this.IsSelectNiBan) {
      this.itemmodel['commitType'] = 600;
    }

      //是传阅件的时候传阅和下一步不能同时提交
    if (!this.DealType) {
      if (this.nextArr.length > 0 && this.readerArr.length > 0) {
        this.toast.presentToast('传阅和下一步不能同时提交');
        return;
      }
    }
  
      if (this.DealType === false) {
       // this.hostArr = [];
        if (this.readerArr.length > 0) {
          this.itemmodel['commitType'] = 200;
        } else {
          this.itemmodel['commitType'] = 600;
        }
      }
      //参数模型
      this.handleModel = {
        id: this.itemmodel['Id'],
        // 主办id 单选
        primaryDeptId: this.hostArr.length > 0 ? this.hostArr[0] : '',

        cooperaters: this.coorperationArr,
        /**
         * 下一步
         */
        leaders: this.nextArr,

        /**
         * 传阅
         */
        readers: this.readerArr,

        // 模态框
        commitType: this.itemmodel['commitType'],

        CoorType: this.itemmodel['CoorType'],

        ProcessType: this.itemmodel['ProcessType']
      };

      this.mainservice.lasthandinStep(this.handleModel).subscribe(
        res => {
          if (res['State'] == 1) {
            this.toast.presentToast('提交成功');
            //this.route.navigate(['tabs']);
            this.nav.navigateBack("documentlist");
            // this.modalController.dismiss();
          } else {
            this.toast.presentToast(res['Message']);
          }
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
    }

  /**
   * 关闭
   */
  closeclick() {
    this.modalController.dismiss();
  }
}
