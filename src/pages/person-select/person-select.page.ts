import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainindexService, lasthandinStepModel, PendingReaderModel } from './../../service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-person-select',
  templateUrl: './person-select.page.html',
  styleUrls: ['./person-select.page.scss'],
})
export class PersonSelectPage implements OnInit {

  /**
   * 传过来的模型
   */
  itemmodel: any;

  /**
   * 控制显示隐藏某个tab
   */
  TabTitltArr: any[] = [
    {
      'title': '主办',
      'show': true,
      'value': 1
    },
    {
      'title': '协办',
      'show': true,
      'value': 2
    },
    {
      'title': '传阅',
      'show': true,
      'value': 3
    },
    {
      'title': '下一步',
      'show': true,
      'value': 4
    },
  ];



  handleModel: lasthandinStepModel;

  type = 1;

  isDepartmentSelect = true;

  isSingleSelect = true;

  //记录主办的数组
  // 记录主办的数组
  hostArr: any[] = [];

  // 记录协办数组
  coorperationArr: any[] = [];

  //记录传阅的数组
  readerArr: any[] = [];

  //记录下一步的数组
  nextArr: any[] = [];

  hasSelected: any; // 自动勾选已选列表

  //下一步是否选了到拟办
  IsSelectNiBan: boolean = false;

  constructor(
    private nav: NavController,
    private mainservice: MainindexService,
    private activeRoute: ActivatedRoute,
    private toast:CommonHelper,
    private route: Router
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.itemmodel = JSON.parse(params['item']);
      this.hasSelected = JSON.parse(params['hasSelected']);
    });
  }

  ngOnInit() {
  }

  segmentChanged(event: any) {
    switch (event.detail.value) {
      case '1': // 主办
        this.type = 1;
        this.isDepartmentSelect = true;
        this.isSingleSelect = true;
        break;
      case '2': // 协办
        this.type = 2;
        this.isDepartmentSelect = true;
        this.isSingleSelect = false;
        break;
      case '3': // 传阅
        this.type = 3;
        break;
      case '4': // 下一步
        this.type = 4;
        break;
    }
  }

  hostSelected(items: any[]) {
    console.log('host主办');
    if (this.type == 1) {
      this.hostArr = items;
      console.log(this.hostArr);
    } else if (this.type == 2) {
      this.coorperationArr = items;
      this.coorperationArr = this.coorperationArr.map((item) => {
        return item['id'];
      });
      console.log(this.coorperationArr);
    }



  }

  nextSelected(items: any, leaderChecked: boolean, nbChecked: boolean) {

    //如果是传阅
    if (this.type == 3) {
      //组装传阅数组
      this.readerArr = [];
      //组装选中的部门为模型
      if (items['deptId'].length > 0) {
        for (var i = 0; i < items['deptId'].length; i++) {
          var departmentModel = <PendingReaderModel>{
            staffId: '',
            deptId: items['deptId'][i]
          }
          this.readerArr.push(departmentModel);
        }
      }
      //组装选中的人为模型
      if (items['staffId'].length > 0) {
        for (var i = 0; i < items['staffId'].length; i++) {
          var departmentModel = <PendingReaderModel>{
            staffId: items['staffId'][i],
            deptId: ''
          }
          this.readerArr.push(departmentModel);
        }
      }
      console.log(this.readerArr);
    }
    //如果是下一步
    else if (this.type == 4) {
      //先直接拿到人的id数组  如果有部门id返回的话 就拿到部门里面的所有人的id
      this.nextArr = items['staffId'];
      if (items['deptId'].length > 0) {
        for (var i = 0; i < items['deptId'].length; i++) {
          this.mainservice.getDeptTreeCY(items['deptId'][i]).subscribe((res) => {
            console.log('下一步组装数据');
            if (res['State'] == 1) {
              var tempArr = <any[]>res['Data'];
              tempArr = tempArr.map((item) => {
                return item['id'];
              });
              tempArr.forEach((id) => {
                this.nextArr.push(id);
              });
            }
          });
        }
      }
      console.log('haha');
      //下一步数据在此组装完毕
      console.log(this.nextArr);
    }

    if (this.type == 4) {
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
    console.log('提交');
    //如果是拟办到拟办 commotType改为600)
    if (this.IsSelectNiBan) {
      this.itemmodel['commitType'] = 600;
    }

    this.handleModel = {
      id: this.itemmodel['Id'],
      //主办id 单选
      primaryDeptId: this.hostArr.length > 0 ? this.hostArr[0]['id'] : '',
      
      cooperaters: this.coorperationArr,
      /**
       * 下一步
       */
      leaders: this.nextArr,

      /**
       * 传阅
       */
      readers: this.readerArr,

      //模态框
      commitType: this.itemmodel['commitType'],

      CoorType: this.itemmodel['CoorType'],

      ProcessType: this.itemmodel['ProcessType'],

    };

    console.log(this.handleModel);
    this.mainservice.lasthandinStep(this.handleModel).subscribe((res) => {
      if (res['State'] == 1) {
        this.toast.presentToast('提交成功');
        this.route.navigate(['tabs']);
      }else {
        this.toast.presentLoading(res['Message']);
      }
    },err => {
      this.toast.presentLoading('请求失败');
    });
  }


}
