import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { count } from 'rxjs/operators';

@Component({
  selector: 'app-main-index',
  templateUrl: './main-index.page.html',
  styleUrls: ['./main-index.page.scss'],
})
export class MainIndexPage implements OnInit {

  titleArr: string[] = ['收文待办', '发文待办', '传阅件', '已办工作'];

  countArr: number[] = [];

  constructor(private mainindexservice: MainindexService, private nav: NavController, private toast: CommonHelper) { }

  ngOnInit() {
    this.getdata();
  }

  /**
   * 获取数据
   */
  getdata() {
    this.mainindexservice.getmainindexdata().subscribe((res) => {
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
      }else {
        this.toast.presentToast('请求出错');
      }
    }, (err) => {
      this.toast.presentToast('请求失败');
    });
  }

}
