import { ActivatedRoute, Params } from '@angular/router';
import { MainindexService, lasthandinStepModel, PendingReaderModel } from './../../service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { last } from 'rxjs/operators';
import { TouchSequence } from 'selenium-webdriver';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { ActivatedRoute, Params } from '@angular/router';

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

  constructor(
    private nav: NavController,
    private mainservice: MainindexService,
    private activeRoute: ActivatedRoute
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
      console.log(this.itemmodel);
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
    } else if (this.type == 3) {
      this.readerArr = [];
      if (items['deptId'].length > 0) {
        for (var i = 0; i < items['deptId'].length; i++) {
          var departmentModel = <PendingReaderModel>{
            staffId: '',
            deptId: items['deptId'][i]
          }
          this.readerArr.push(departmentModel);
        }
      }
      console.log(this.readerArr);
    } else {
      this.nextArr = items['staffId'];
      console.log(this.nextArr);
    }



  }

  nextSelected(items: any) {
    console.log(items);
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
    console.log('提交'),
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
      console.log('提交之后');
      console.log(res);
    });
  }


}
