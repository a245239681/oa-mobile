import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';

@Component({
  selector: 'app-send-action-tree',
  templateUrl: './send-action-tree.page.html',
  styleUrls: ['./send-action-tree.page.scss'],
})
export class SendActionTreePage implements OnInit {

  itemmodel:any;

  //列表数组
  dataArr: any[] = [];

  //层数目
  floor:number;

  //
  selectItem:any;
  constructor(private mainservice: MainindexService,
     private activeRouter:ActivatedRoute,
     private toast:CommonHelper) {
    this.activeRouter.queryParams.subscribe((params:Params) => {
        this.itemmodel = JSON.parse(params['item']);
    });
   }

  ngOnInit() {
    this.getdata();
  }

  singleselect(item,index) {
    this.selectItem = item;
    console.log(this.selectItem);
  }

  getdata() {
    this.mainservice.GetActionTreeSend(this.itemmodel['Id'],this.itemmodel['ProcessType']).subscribe((res) => {
      console.log(res);
      if (res['State'] == 1) {
        this.dataArr = res['Data'];
        console.log(this.dataArr);
        if (this.dataArr.length > 0) {
          var tempArr = <any[]>this.dataArr[0]['Children'];

          if (tempArr.length > 0) {
            var item = tempArr[0];
            if (item['Type'] == 2) {
              this.floor = 2;
            }else {
              this.floor = 3;
            }
          }
        }
      }
    });
  }

}