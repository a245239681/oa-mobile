import { loginModel } from './../../service/login/login.service';
import { CommonHelper } from './../../infrastructure/commonHelper';
import { MainindexService } from './../../service/maiindex/mainindex.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonRefresher, IonInfiniteScroll } from '@ionic/angular';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { getDateDiff } from 'src/infrastructure/regular-expression';
import { concat } from 'rxjs/operators';

@Component({
  selector: 'app-documentlist',
  templateUrl: './documentlist.page.html',
  styleUrls: ['./documentlist.page.scss']
})
export class DocumentlistPage implements OnInit {
  @ViewChild(IonRefresher) ionRefresh: IonRefresher;
  @ViewChild(IonInfiniteScroll) ionInfiniteScroll: IonInfiniteScroll;
  // 列表数据
  listdataArr: any[] = [];

  /** 搜索内容 */
  searchStr = '';

  /** 当前页 */
  currentPage = 1;

  /** 是否可以继续上拉 */
  nohasmore = true;

  /** 1 收文 2 发文 3 传阅件 4 已办收文 5 已办发文 */
  type = 1;

  /** 1  已办收文 2  已办发文 */
  stype = 1;

  title = '公文列表';

  loading = false;

  constructor(
    private nav: NavController,
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
    private activeRoute: ActivatedRoute,
    private route: Router
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      this.type = +params['type'];
      // this.title =
      //   this.type === 1 ? '收文待办' : this.type === 2 ? '发文待办' : '传阅件';
      // 匹配是从哪个页面进来的
      switch (this.type) {
        case 1:
          this.title = '收文待办';
          break;
        case 2:
          this.title = '发文待办';
          break;
        case 3:
          this.title = '传阅件';
          break;
        case 4:
          this.title = '已办收文';
          break;
        default:
          this.title = '已办发文';
          break;
      }
    });
  }

  ionViewDidEnter(){
    this.getdata();
  }

  ngOnInit() {
    
  }
  /**
   * 获取列表数据
   */
  getdata() {
    this.currentPage = 1;
    this.listdataArr = [];
    this.ionInfiniteScroll.disabled = false;
    if (this.type === 1 || this.type === 2 || this.type === 3) {
      this.mainindexservice
        .getneedtodolist(this.currentPage, this.type, this.searchStr)
        .subscribe(
          res => {
            this.loading = false;
            this.ionRefresh.complete();
            if (res['State'] === 1) {
              this.listdataArr = res['Data']['PageOfResult'];
              // this.listdataArr.forEach(x => x.ItemActionName = '拟办');
              if (this.listdataArr.length <= 20) {
                this.nohasmore = true;
              } else {
                this.nohasmore = false;
                this.currentPage += 1;
              }

              if (this.type === 1) {
                this.listdataArr = this.listdataArr.map(item => {
                  const dates = getDateDiff(
                    item['FinishDate'],
                    new Date().toDateString()
                  );
                  if (
                    item['Emergency'] === '特急' ||
                    item['Emergency'] === '紧急' ||
                    dates <= 3
                  ) {
                    item['color'] = '#D1202E';
                  } else if (dates > 3 && dates <= 7) {
                    item['color'] = '#F99D31';
                  } else {
                    item['color'] = '#2D3479';
                  }
                  return item;
                });
              }
            } else {
              this.toast.presentToast('已无数据');
            }
          },
          err => {
            this.ionRefresh.complete();
            this.toast.presentToast('请求失败');
          }
        );
    }
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
    if ('Enter' === event.key) {
      this.seachclick(search);
    }
  }

  /**
   * 下拉刷新
   */

  doRefresh(event) {
    this.getdata();
  }

  /**
   * 上拉加载
   */
  loadMoreData(event) {
    this.mainindexservice
      .getneedtodolist(this.currentPage, this.type, this.searchStr)
      .subscribe(
        res => {
          this.ionInfiniteScroll.complete();
          if (res['State'] === 1) {
            const tempArr: any[] = res['Data']['PageOfResult'];
            tempArr.forEach(item => {
              this.listdataArr.push(item);
            });

            if (tempArr.length <= 20) {
              this.nohasmore = true;
            } else {
              this.nohasmore = false;
              this.currentPage++;
            }

            if (this.type === 1) {
              this.listdataArr = this.listdataArr.map(item => {
                const dates = getDateDiff(
                  item['FinishDate'],
                  new Date().toDateString()
                );
                if (
                  item['Emergency'] === '特急' ||
                  item['Emergency'] === '紧急' ||
                  dates <= 3
                ) {
                  item['color'] = '#D1202E';
                } else if (dates > 3 && dates <= 7) {
                  item['color'] = '#F99D31';
                } else {
                  item['color'] = '#2D3479';
                }
                return item;
              });
            }
          } else {
            this.toast.presentToast('已无数据');
          }
        },
        err => {
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
    /** 把操作序号添加到json */
    item['documenttype'] = this.type;
    /** 把操作列表添加到json */
    item['Operationlist'] = this.title;

    // 点击签收
    this.mainindexservice
      .signclick(item['Id'], item['ProcessType'], item['CoorType'])
      .subscribe(
        res => {
          this.route.navigate(['documentdetail'], {
            queryParams: {
              item: JSON.stringify(item)
            }
          });
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
  }
}
