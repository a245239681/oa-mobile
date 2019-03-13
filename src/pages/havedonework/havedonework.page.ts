import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, NavController } from '@ionic/angular';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-havedonework',
  templateUrl: './havedonework.page.html',
  styleUrls: ['./havedonework.page.scss'],
})
export class HavedoneworkPage implements OnInit {

  @ViewChild(IonRefresher) ionRefresh: IonRefresher;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  //列表数据
  listdataArr: any[] = [];

  //当前页
  currentPage: number = 1;

  //收文已办 发文已办
  type: number = 1;

  //是否可以继续上拉
  nohasmore: boolean = true;
  constructor(private nav: NavController,
    private route: Router,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    public activeRoute: ActivatedRoute) { }

  /**
   * 
   * @param event 点击Segment
   */
  segmentChanged(event: any) {
    console.log('Segment changed', event.target.value);
    this.type = event.target.value;
    this.getdata();
  }
  ngOnInit() {
    this.getdata();
  }
  /**
   * 获取列表数据
   */
  getdata() {
    this.currentPage = 1;
    this.listdataArr = [];
    this.ionInfiniteScroll.disabled = false;
    this.mainindexservice.getBrowserFile(this.currentPage, this.type).subscribe((res) => {
      this.ionRefresh.complete();
      if (res['State'] == '1') {
        console.log(res);
        this.listdataArr = res['Data']['PageOfResult'];
        if (this.listdataArr.length < 10) {
          this.nohasmore = true;
        } else {
          this.nohasmore = false;
          this.currentPage += 1;
        }

      } else {
        this.toast.presentToast('已无数据');
      }
      console.log(this.nohasmore);
    }, err => {
      this.ionRefresh.complete();
      this.toast.presentToast('请求失败');
    });
  }


/**
 * 下拉刷新
 * @param event 
 */  doRefresh(event) {
    this.getdata();
  }

  /**
   * 上拉加载
   * @param infiniteScroll 
   */
  loadMoreData(event) {
    console.log('上拉加载');
    this.mainindexservice.getBrowserFile(this.currentPage, this.type).subscribe((res) => {
      this.ionInfiniteScroll.complete();
      if (res['State'] == '1') {
        var tempArr: any[] = res['Data']['PageOfResult'];
        tempArr.forEach((item) => {
          this.listdataArr.push(item);
        });

        if (tempArr.length < 10) {
          this.nohasmore = true;
        } else {
          this.nohasmore = false;
          this.currentPage++;
        }

      } else {
        this.toast.presentToast('已无数据');
      }
      console.log(this.nohasmore);
    }, err => {
      this.ionInfiniteScroll.complete();
      this.toast.presentToast('请求失败');
    });

  }

  /**
  * 返回
  */
  canGoBack() {
    this.nav.back();
  }

  /**
   * 进入详情
   */
  pushIntodetail(item: any) {
    // this.route.navigate(['documentdetail'], {
    //   queryParams: {
    //     'item': JSON.stringify(item)
    //   },
    // });
    this.route.navigate(['person-select']);
  }

}
