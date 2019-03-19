import { CommonHelper } from './../../infrastructure/commonHelper';
import { MainindexService } from './../../service/maiindex/mainindex.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonRefresher, IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getDateDiff } from 'src/infrastructure/regular-expression';
@Component({
  selector: 'app-addresslist',
  templateUrl: './addresslist.page.html',
  styleUrls: ['./addresslist.page.scss'],
})
export class AddresslistPage implements OnInit {

  title = '通讯录';
  items = [];
  constructor(
    private nav: NavController,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) { }

  ngOnInit() {
    this.getMailList();
  }

  /**
   * 获取通讯录数据列表
   */
  getMailList() {

    this.mainindexservice.getMaliList().subscribe(res => {
      if (res.State === 1) {

        this.items = res.Data[0].children;
        console.log(this.items);
      }
    });
  }

  /**
   * 查看当前部门下的相关人员
   */
  mailShow(item: any, dept: any) {
    console.log(item);
    console.log(dept);
    this.route.navigate(['mail-list'], {
      queryParams: {
        item: JSON.stringify(item),
        dept: JSON.stringify(dept)
      }
    });
  }

}
