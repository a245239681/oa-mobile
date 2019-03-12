import { saveadviceModel } from './../../service/maiindex/mainindex.service';
import { NavController } from '@ionic/angular';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainindexService } from 'src/service/maiindex/mainindex.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.page.html',
  styleUrls: ['./submission.page.scss'],
})
export class SubmissionPage implements OnInit {

  //传进来的公文模型
  itemmodel: any;

  adviceForm: FormGroup;

  /**
   * 保存意见用的Type
   */
  attitudeType: string;

  /**
   * 当前框里的意见
   */
  CurAttitude: string;

  /**
   * 常用语数组
   */
  oftenuseArr: any[] = [];

  formErrors = {                        // 错误信息
    advice: ''
  };


  validationMessages = {              // 错误信息模板
    advice: {
      required: '意见不能为空',
    }
  };



  constructor(private activeroute: ActivatedRoute,
    private fb: FormBuilder,
    private toast: CommonHelper,
    private nav: NavController,
    private route: Router,
    private mainservice: MainindexService

  ) {
    this.activeroute.queryParams.subscribe((params: Params) => {
      console.log(JSON.parse(params['item']));
      this.itemmodel = JSON.parse(params['item']);
      this.getattitudeType();
    });
    this.creatForm();
  }

  creatForm() {
    this.adviceForm = this.fb.group({
      advice: ['', [Validators.required]],
    });
    this.adviceForm.valueChanges.subscribe((data) => {
      this.toast.onInputValueChanged(this.adviceForm, this.formErrors, this.validationMessages);
    });
    this.toast.onInputValueChanged(this.adviceForm, this.formErrors, this.validationMessages);
  }

  /**
   * 点击提交或者保存进入相应的方法
   * @param type 
   * @param value 获取到的输入框的值
   */
  handleAdvice(type: number, value: any) {
    console.log(value);
    if (type == 0) {
      console.log('保存');
      this.saveadvice(value['advice']);
    } else {
      console.log('提交');
      this.handleInfo(value['advice']);
    }
  }

  ngOnInit() {

  }

  /**
   * 获取保存意见需要的attitudeType
   */
  getattitudeType() {
    this.mainservice.getattitudeType(this.itemmodel['Id'], this.itemmodel['ProcessType'], this.itemmodel['CoorType']).subscribe((res) => {
      console.log(res);
      this.getoftenuse();
      if (res['State'] == 1) {
        this.attitudeType = res['Data']['Authority']['CurAttitudeType'];
        this.CurAttitude = res['Data']['Authority']['CurAttitude'];
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 
   * @param content 常用语
   */
  getoftenuse() {
    this.mainservice.getoftenuse().subscribe((res) => {
      if (res['State'] == 1) {
        console.log(res);
        this.oftenuseArr = res['Data'];
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 保存意见
   */
  saveadvice(content: string) {
    if (this.attitudeType) {
      var savemodel = <saveadviceModel>{
        attitudeType: this.attitudeType,
        content: content,
        coorType: this.itemmodel['CoorType'],
        processType: this.itemmodel['ProcessType'],
        relationId: this.itemmodel['Id'],
        skipValid: false
      }
      this.mainservice.saveadvice(savemodel).subscribe((res) => {
        if (res['State'] == 1) {
          console.log(res);
          this.toast.presentToast('保存成功');
        }
      }, err => {
        this.toast.presentToast('请求失败');
      });
    } else {
      this.toast.presentToast('缺少参数');
    }
  }

  /**
   * 提交
   */
  handleInfo(content: string) {
    if (this.attitudeType) {
      var savemodel = <saveadviceModel>{
        attitudeType: this.attitudeType,
        content: content,
        coorType: this.itemmodel['CoorType'],
        processType: this.itemmodel['ProcessType'],
        relationId: this.itemmodel['Id'],
        skipValid: false
      }
      this.mainservice.saveadvice(savemodel).subscribe((res) => {
        if (res['State'] == 1) {
          console.log(res);
          //调用提交的接口
          this.mainservice.getToastType(this.itemmodel['Id'],this.itemmodel['ProcessType'],this.itemmodel['CoorType']).subscribe((res) => {
            console.log(res);
            if (res['State'] == 1) {
              //增加一个模态框的type的字段
              this.itemmodel['commitType'] = res['Type'];
              this.route.navigate(['person-select'],{
                queryParams: {
                  'item': JSON.stringify(this.itemmodel),
                },
              });
            }
          },err => {
            console.log(err);
          });
          
        }else {
          this.toast.presentToast(res['Message']);
        }
      }, err => {
        this.toast.presentToast('请求失败');
      });
    } else {
      this.toast.presentToast('缺少参数');
    }
  }

  /**
   * 点击常用语
   */
  gettheoftenuse(index: number) {
    this.CurAttitude = this.oftenuseArr[index]['Text'];
  }

  /**
  * 返回
  */
  canGoBack() {
    this.nav.back();
  }
}
