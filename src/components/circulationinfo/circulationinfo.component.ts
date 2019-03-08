import { CommonHelper } from 'src/infrastructure/commonHelper';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-circulationinfo',
  templateUrl: './circulationinfo.component.html',
  styleUrls: ['./circulationinfo.component.scss'],
})
export class CirculationinfoComponent implements OnInit {

  @Input() itemmodel: any;

  parenteArr: any[] = [];

  constructor(private mainservice: MainindexService, private toast: CommonHelper) { }

  ngOnInit() {
    this.getdata();
  }

  /**
   * 获取数据
   */
  getdata() {
    this.mainservice.getReciveDetailInfo(this.itemmodel['Id']).subscribe((res) => {
      console.log(res);
      if (res['State'] == 1) {
        this.parenteArr = res['Data'];
      } else {
        this.toast.presentToast('暂无数据');
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 点击展示
   */
  getsubtitle(itemid: number) {
    console.log(itemid);
    var item = this.parenteArr[itemid];
    //如果有数据了就不请求了
    if (item['children'].length > 0) {

      return;
    } else {
      this.mainservice.getReciveDetailInfo(this.itemmodel['Id'], item['ID']).subscribe((res) => {
        console.log(res);
        if (res['State'] == 1) {
          item['children'] = res['Data'];
        } else {
          this.toast.presentToast('暂无数据');
        }
      }, err => {
        this.toast.presentToast('请求失败');
      });
    }

  }
}
