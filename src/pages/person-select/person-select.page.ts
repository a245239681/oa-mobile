import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-person-select',
  templateUrl: './person-select.page.html',
  styleUrls: ['./person-select.page.scss'],
})
export class PersonSelectPage implements OnInit {

  type = 1;

  isDepartmentSelect = true;

  isSingleSelect = true;

  //记录主办的数组
  hostArr:any[] = [];

  //记录协办数组
  coorperationArr: any[] = [];

  //记录传阅的数组
  readerArr:any[] = [];

  //记录下一步的数组
  nextArr:any[] =[];

  constructor(
    private nav: NavController,
  ) { }

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
    }else if (this.type == 2) {
      this.coorperationArr = items;
    }
    console.log(this.hostArr);

    console.log(this.coorperationArr);
  }

  /**
  * 返回
  */
  canGoBack() {
    this.nav.back();
  }

}
