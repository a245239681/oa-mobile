import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainindexService, lasthandinStepModel } from './../../service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';
import { TouchSequence } from 'selenium-webdriver';

@Component({
  selector: 'app-end-action',
  templateUrl: './end-action.page.html',
  styleUrls: ['./end-action.page.scss'],
})
export class EndActionPage implements OnInit {

  //传进来的itemmodel
  itemmodel: any;

  //选项数组
  radioArr: any[] = [];

  selectitem: any = null;

  handleModel: lasthandinStepModel;

  constructor(private mainservice: MainindexService,
    private activatedRoute: ActivatedRoute,
    private toast: CommonHelper,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
    });

  }

  ngOnInit() {
    this.getenddata();
  }

  /**
   * 获取数据
   */
  getenddata() {
    this.toast.presentLoading();
    this.mainservice.getendAction(this.itemmodel['Id'], this.itemmodel['ProcessType']).subscribe((res) => {
      this.toast.dismissLoading();
      if (res['State'] == 1) {
        this.radioArr = res['Data'];
      } else {
        this.toast.presentToast(res['Message']);
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 提交
   */
  handinclick() {
    if (this.selectitem) {
      this.toast.presentLoading();
      this.mainservice.endActionStep(this.itemmodel['Id'], this.itemmodel['commitType'], this.selectitem['id'],this.itemmodel['ProcessType']).subscribe((res) => {
        this.toast.dismissLoading();
        if (res['State'] == 1) {
          this.toast.presentToast('操作完成');
          this.router.navigate(['tabs']);
        }
      });
    } else {
      this.toast.presentToast('请选择');
    }
  }

  /**
   * 单选
   */
  singleSelect(index: number) {
    this.radioArr[index]['checked'] = !this.radioArr[index]['checked'];

    if (this.radioArr[index]['checked'] == true) {
      this.selectitem = this.radioArr[index];
    } else {
      this.selectitem = null;
    }
  }

}
