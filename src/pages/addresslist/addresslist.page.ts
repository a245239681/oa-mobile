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

  temp: any;
  /**
   * 搜索
   */
  searchStr = '';

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
   * 搜索
   */
  SearchFilter(event: any) {
    const val = event.toLowerCase();
    // filter our data
    const temp = this.temp.children.filter(function(d: any) {
      return d.text.toLowerCase().indexOf(val) !== -1 || !val;
    });
    this.route.navigate(['mail-list'], {
      queryParams: {
        item: JSON.stringify(temp),
        dept: JSON.stringify(this.temp.text)
      }
    });
  }

  /**
   * 获取通讯录数据列表
   */
  getMailList() {

    this.mainindexservice.getMaliList().subscribe(res => {
      if (res.State === 1) {

        this.items = res.Data[0].children;
        this.temp = res.Data[0];
        // console.log(this.items);
      }
    });
  }

  /**
   * 查看当前部门下的相关人员
   */
  mailShow(item: any, dept: any) {
    // console.log(item);
    //  console.log(dept);
    this.route.navigate(['mail-list'], {
      queryParams: {
        item: JSON.stringify(item),
        dept: JSON.stringify(dept)
      }
    });
  }

}
