import { Component, OnInit, ViewChild } from '@angular/core';
import { IonRefresher, IonInfiniteScroll, NavController } from '@ionic/angular';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-havedonework',
  templateUrl: './havedonework.page.html',
  styleUrls: ['./havedonework.page.scss']
})
export class HavedoneworkPage implements OnInit {
  @ViewChild(IonRefresher) ionRefresh: IonRefresher;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  // 列表数据
  listdataArr: any[] = [];

  /** 当前页 */
  currentPage = 1;

  // 收文已办 发文已办
  type = 1;

  // 传到详情页面 收文已办 发文已办
  stype = 4;

  title = '已办收文';

  searchStr = '';

  // 是否可以继续上拉
  nohasmore = true;
  constructor(
    private nav: NavController,
    private route: Router,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    public activeRoute: ActivatedRoute
  ) {}

  /**
   *
   * @param event 点击Segment
   */
  segmentChanged(event: any) {
    this.searchStr = '';
    if (event.target.value === '1') {
      this.type = 1;
    } else {
      this.type = 2;
    }
    this.getdata();
  }
  ngOnInit() {
    // this.getdata();
    this.doRefresh();
  }

  /**
   * 获取列表数据
   */
  getdata() {
    this.currentPage = 1;
    this.listdataArr = [];
    this.ionInfiniteScroll.disabled = false;
    // this.toast.presentLoading();
    this.mainindexservice
      .getBrowserFile(this.currentPage, this.type, this.searchStr)
      .subscribe(
        res => {
          // this.toast.dismissLoading();
          this.ionRefresh.complete();
          if (res['State'] === 1) {
            this.listdataArr = res['Data']['PageOfResult'];
            if (
              this.listdataArr.length < 20 ||
              this.listdataArr.length >= res['Data']['TotalCount']
            ) {
              this.nohasmore = true;
            } else {
              this.nohasmore = false;
              this.currentPage += 1;
            }
            // this.listdataArr = this.listdataArr.map(item => {
            //   if (item.Backable) {
            //     item.color = '2';
            //   } else {
            //     item.color = '1';
            //   }
            //   return item;
            // });
          } else {
            this.toast.presentToast('暂无数据');
          }
        },
        err => {
          this.ionRefresh.complete();
          this.toast.presentToast('请求失败');
        }
      );
  }

  /**
   *搜索
   */
  seachclick(text: string) {
    this.getdata();
  }

  /**监听回车搜索
   *  @param event 根据页面传回来的event
   *  @param search 搜索内容
   */
  onSearchKeyUp(event: any, search: string) {
    this.currentPage = 1;
    if ('Enter' === event.key) {
      this.seachclick(search);
    }
  }

  /**
   * 下拉刷新
   */
  doRefresh(event?) {
    this.getdata();
  }

  /**
   * 上拉加载
   */
  loadMoreData(event) {
    // this.toast.presentLoading();
    this.mainindexservice
      .getBrowserFile(this.currentPage, this.type, this.searchStr)
      .subscribe(
        res => {
          // this.toast.dismissLoading();
          this.ionRefresh.complete();
          this.ionInfiniteScroll.complete();
          if (res['State'] === 1) {
            const tempArr = res['Data']['PageOfResult'];
            tempArr.forEach(item => {
              // if (item.Backable) {
              //   item.color = '2';
              // } else {
              //   item.color = '1';
              // }
              this.listdataArr.push(item);
            });
            if (
              tempArr.length < 20 ||
              this.listdataArr.length >= res['Data']['TotalCount']
            ) {
              this.nohasmore = true;
            } else {
              this.nohasmore = false;
              this.currentPage += 1;
            }
          } else {
            this.toast.presentToast('已无数据');
          }
        },
        err => {
          this.ionRefresh.complete();
          this.ionInfiniteScroll.complete();
          this.toast.presentToast('请求失败');
        }
      );
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
    if (this.type === 1) {
      this.stype = 4;
      this.title = '已办收文';
    } else {
      this.stype = 5;
      this.title = '已办发文';
    }
    /** 把操作序号添加到json */
    item['documenttype'] = this.stype;
    /** 把操作列表添加到json */
    item['Operationlist'] = this.title;
    this.route.navigate(['documentdetail'], {
      queryParams: {
        item: JSON.stringify(item)
      }
    });
  }
  ionViewWillEnter() {
    this.getdata();
  }
  /**
   * 进入公文列表 1 收文已办 2 发文已办
   */
  // pushDocumentList(index: number) {
  //   this.nav.navigateForward(['documentlist'], {
  //     queryParams: {
  //       type: ++index
  //     }
  //   });
  // }
}
