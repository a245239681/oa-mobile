import { Router } from '@angular/router';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.page.html',
  styleUrls: ['./main-index.page.scss']
})
export class MainIndexPage implements OnInit {
  titleArr = [
    { text: '收文待办', bgcolor: '#e7fae3', forecolor: '#67c554' },
    { text: '发文待办', bgcolor: '#fdeff0', forecolor: '#f87a85' },
    { text: '传阅件', bgcolor: '#e3f6fc', forecolor: '#4877fb' },
    { text: '已办工作', bgcolor: '#faf7e4', forecolor: '#f1cb14' }
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
   * 获取数据
   */
  getdata() {
    this.mainindexservice.getmainindexdata().subscribe(
      res => {
        if (res['State'] == '1') {
          var dataArr: any[] = res['Data'];
          this.countArr = [];
          for (var i = 0; i < dataArr.length; i++) {
            this.countArr[i] = dataArr[i]['Count'];
          }
          if (this.countArr.length < 4) {
            for (var j = 0; j < 4 - this.countArr.length; j++) {
              this.countArr.push(-1);
            }
          }
        } else {
          this.toast.presentToast('请求出错');
        }
      },
      err => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  /**
   * 进入公文列表 1 收文 2 发文 3 传阅件
   */
  pushDocumentList(index: number) {
    if (index == 3) {
      this.route.navigate(['havedonework'], {
        queryParams: {
          type: ++index
        }
      });
    } else {
      this.route.navigate(['documentlist'], {
        queryParams: {
          type: ++index
        }
      });
    }
  }
}
