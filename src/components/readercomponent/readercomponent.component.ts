import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'app-readercomponent',
  templateUrl: './readercomponent.component.html',
  styleUrls: ['./readercomponent.component.scss'],
})
export class ReadercomponentComponent implements OnInit {

  /**
   * 住房局的所有机构的数组
   */
  alldepartmentArr: any[] = [];

  constructor(private mainservice: MainindexService,private toast: CommonHelper) { }

  ngOnInit() {
    this.getdata('1');
   }

  /**
   * 获取所有机构
   */
  getdata(id: string) {
    this.mainservice.getDeptTreeCY(id).subscribe((res) => {
      console.log(res);
      if (res['State'] == 1) {
        this.alldepartmentArr = res['Data'];
      }else {
        this.toast.presentToast('暂无数据');
      }
    },err => {
      this.toast.presentToast('请求失败');
    });
  }

  itemClick(item: any,index:number) {
    console.log('点击父');
    
    if (this.alldepartmentArr[index]['attributes']['NodeType'] == 'Dept' && this.alldepartmentArr[index]['children'].length < 1) {
      this.mainservice.getDeptTreeCY(this.alldepartmentArr[index]['id']).subscribe((res) => {
        console.log(res);
        if (res['State'] == 1) {
           this.alldepartmentArr[index]['children'] = res['Data'];
        }else {
          this.toast.presentToast('暂无数据');
        }
      },err => {
        this.toast.presentToast('请求失败');
      });
    }else {

    }
  }

  subitemclick() {
    console.log('点击子')
  }

  /**
   * checkbox点击
   */
  checkboxClick(event) {

  }

}
