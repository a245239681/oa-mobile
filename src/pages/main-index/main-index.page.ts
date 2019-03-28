import { Router } from '@angular/router';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NavController, IonRefresher } from '@ionic/angular';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.page.html',
  styleUrls: ['./main-index.page.scss']
})
export class MainIndexPage implements OnInit {
  // 关闭下拉
  @ViewChild(IonRefresher) ionRefresh: IonRefresher;
  titleArr = [
    { text: '收文待办', bgcolor: '#e7fae3', forecolor: '#67c554',borderTop: 'bor_top block' },
    { text: '发文待办', bgcolor: '#fdeff0', forecolor: '#f87a85' ,borderTop: 'block'},
    { text: '传阅查看', bgcolor: '#e3f6fc', forecolor: '#4877fb' ,borderTop: 'bor_bottom bor_top block'},
    { text: '已办业务', bgcolor: '#faf7e4', forecolor: '#f1cb14',borderTop: 'bor_bottom block' }
  ];

  countArr: number[] = [];

  constructor(
    private mainindexservice: MainindexService,
    private nav: NavController,
    private toast: CommonHelper,
    private route: Router
  ) {}

  ngOnInit() {
    this.getdata();
  }

  /**
   * 下拉刷新
   */

  doRefresh(event) {
    this.getdata();
  }

  /**
   * 获取数据
   */
  getdata() {
    this.mainindexservice.getmainindexdata().subscribe(
      res => {
        if (res['State'] === 1) {
          this.ionRefresh.complete();
          const dataArr: any[] = res['Data'];
          this.countArr = [];
          for (let i = 0; i < dataArr.length; i++) {
            this.countArr[i] = dataArr[i]['Count'];
          }
          if (this.countArr.length < 4) {
            for (let j = 0; j < 4 - this.countArr.length; j++) {
              this.countArr.push(-1);
            }
          }
        } else {
          this.ionRefresh.complete();
          this.toast.presentToast('请求出错');
        }
      },
      err => {
        this.ionRefresh.complete();
        this.toast.presentToast('请求失败');
      }
    );
  }

  /**
   * 进入公文列表 1 收文 2 发文 3 传阅件
   */
  pushDocumentList(index: number) {
    if (index === 3) {
      // 进入已办页面
      this.nav.navigateForward(['havedonework']);
      // this.route.navigate(['havedonework'], {
      //   queryParams: {
      //     'type': ++index
      //   }
      // });
    } else {
      // 进入公文列表 1 收文 2 发文 3 传阅件
      this.nav.navigateForward(['documentlist'], {
        queryParams: {
          type: ++index
        }
      });
    }
  }
}
