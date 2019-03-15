import { UserInfo } from 'src/infrastructure/user-info';
import { saveadviceModel } from './../../service/maiindex/mainindex.service';
import { NavController, AlertController } from '@ionic/angular';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainindexService } from 'src/service/maiindex/mainindex.service';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.page.html',
  styleUrls: ['./submission.page.scss']
})
export class SubmissionPage implements OnInit {
  // 传进来的公文模型
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
   * 提交按钮标题
   */
  handinButtonTitle: string;

  /**
   * 是否展示提交并分发
   */
  IsShowHandinAndGiveButton = false;

  /**
   * 常用语数组
   */
  oftenuseArr: any[] = [];

  alertVC: HTMLIonAlertElement;

  formErrors = {
    // 错误信息
    advice: ''
  };

  validationMessages = {
    // 错误信息模板
    advice: {
      required: '意见不能为空'
    }
  };

  constructor(
    private activeroute: ActivatedRoute,
    private fb: FormBuilder,
    private toast: CommonHelper,
    private nav: NavController,
    private route: Router,
    private mainservice: MainindexService,
    private userinfo: UserInfo,
    public alertController: AlertController
  ) {
    this.activeroute.queryParams.subscribe((params: Params) => {
      console.log(JSON.parse(params['item']));
      this.itemmodel = JSON.parse(params['item']);
      if (this.userinfo.GetUserDegree() === 'true') {
        this.handinButtonTitle = '提交并返回代理人';
        this.IsShowHandinAndGiveButton = true;
      } else {
        this.handinButtonTitle = '提交';
      }
      this.getattitudeType();
    });
    this.creatForm();
  }

  creatForm() {
    this.adviceForm = this.fb.group({
      advice: ['', [Validators.required]]
    });
    this.adviceForm.valueChanges.subscribe(data => {
      // this.toast.onInputValueChanged(this.adviceForm, this.formErrors, this.validationMessages);
    });
    // this.toast.onInputValueChanged(this.adviceForm, this.formErrors, this.validationMessages);
  }

  /**
   * 点击提交或者保存进入相应的方法
   // tslint:disable-next-line:no-redundant-jsdoc
   // @param type
   * @param value 获取到的输入框的值
   */
  handleAdvice(type: number, value: any) {
    console.log(value);
    if (type === 0) {
      console.log('保存');
      this.saveadvice(value['advice']);
    } else {
      console.log('提交');
      this.handleInfo(value['advice']);
    }
  }
  /** 移交 */
  handOver() {
    console.log('移交');
    this.mainservice.GetFlow_YJ_DeptStaffTree().subscribe(
      (data: any) => {
        // if (data['State'] === 1) {
        let tempArr = data.Data;

        if (!tempArr) {
          tempArr = [];
        }
        this.route.navigate(['handover-person-select'], {
          queryParams: {
            item: JSON.stringify(this.itemmodel),
            hasSelected: JSON.stringify(tempArr)
          }
        });
        // }
        // else {
        //   this.toast.presentToast('已无数据');
        // }
      },
      () => {
        this.toast.presentToast('请求失败');
      }
    );
  }
  /** 退回 */
  sendBack() {
    console.log('退回');
  }
  ngOnInit() {}

  /**
   * 获取保存意见需要的attitudeType
   */
  getattitudeType() {
    // if (this.itemmodel['IsPrimaryDept'] == true) {
    //   this.itemmodel['CoorType'] = 1;
    // }
    this.mainservice
      .getattitudeType(
        this.itemmodel['Id'],
        this.itemmodel['ProcessType'],
        this.itemmodel['CoorType']
      )
      .subscribe(
        res => {
          console.log(res);
          this.getoftenuse();
          if (res['State'] === 1) {
            this.attitudeType = res['Data']['Authority']['CurAttitudeType'];
            this.CurAttitude = res['Data']['Authority']['CurAttitude'];
          }
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
  }

  /**
   *
   * @param content 常用语
   */
  getoftenuse() {
    this.mainservice.getoftenuse().subscribe(
      res => {
        if (res['State'] === 1) {
          console.log(res);
          this.oftenuseArr = res['Data'];
        }
      },
      err => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  /**
   * 保存意见
   */
  saveadvice(content: string) {
    if (this.attitudeType) {
      const savemodel = <saveadviceModel>{
        attitudeType: this.attitudeType,
        content: content,
        coorType: this.itemmodel['CoorType'],
        processType: this.itemmodel['ProcessType'],
        relationId: this.itemmodel['Id'],
        skipValid: false
      };
      this.mainservice.saveadvice(savemodel).subscribe(
        res => {
          if (res['State'] === 1) {
            console.log(res);
            this.toast.presentToast('保存成功');
          }
        },
        err => {
          this.toast.presentToast('请求失败');
        }
      );
    } else {
      this.toast.presentToast('缺少参数');
    }
  }

  /**
   * 提交
   */
  handleInfo(content: string) {
    if (this.attitudeType) {
      const savemodel = <saveadviceModel>{
        attitudeType: this.attitudeType,
        content: content,
        coorType: this.itemmodel['CoorType'],
        processType: this.itemmodel['ProcessType'],
        relationId: this.itemmodel['Id'],
        skipValid: false
      };
      this.mainservice.saveadvice(savemodel).subscribe(
        res => {
          //身份是领导的情况
          if (this.IsShowHandinAndGiveButton) {
            this.mainservice.handinandbackman(this.itemmodel['Id']).subscribe(
              res => {
                if (res['State'] == 1) {
                  this.itemmodel['commitType'] = '20';
                  //是否在人员机构展示 下一步
                  this.itemmodel['IsShowNextStep'] = false;
                  this.pushNextStep();
                }
              },
              err => {
                this.toast.presentToast('请求失败');
              }
            );
          }

          //不是领导的情况
          else {
            //如果是协办的话点提交的接口就OK
            if (this.itemmodel['CoorType'] == 1) {
              console.log('协办');
              this.handinxieban();
            } else {
              //调用提交的接口
              this.mainservice
                .getToastType(
                  this.itemmodel['Id'],
                  this.itemmodel['ProcessType'],
                  this.itemmodel['CoorType']
                )
                .subscribe(
                  res => {
                    console.log(res);
                    if (res['State'] == 1) {
                      //协办
                      if (res['Ok'] == 'ok' && res['Type'] == 'BMCL') {
                        this.handinxieban();
                      }
                      //结束
                      else if (res['Type'] == 400) {
                        //弹出要结束的模态框 跳到下一步  展示结束步骤
                        console.log('选结束');
                        this.presentEndAlert();
                      }
                      //分件
                      else if (res['Type'] == 300) {
                        this.handinandgiveFile();
                      } else if (res['Type'] == 610) {
                        //610直接commit
                        console.log('看数据');
                        this.itemmodel['commitType'] = 610;
                        console.log(this.itemmodel);
                        console.log(this.itemmodel['commitType']);
                        this.mainservice
                          .commit_610(
                            this.itemmodel['Id'],
                            this.itemmodel['commitType'],
                            this.itemmodel['ProcessType'],
                            this.itemmodel['CoorType']
                          )
                          .subscribe(res => {
                            if (res['State'] == 1) {
                              this.route.navigate(['tabs']);
                            }
                          });
                      }
                      //正常流程提交
                      else {
                        //增加一个模态框的type的字段
                        this.itemmodel['commitType'] = res['Type'];
                        this.pushNextStep();
                      }
                    }
                  },
                  err => {
                    this.toast.presentToast(res['Message']);
                  }
                );
            }
          }
        },
        err => {
          this.toast.presentToast('保存意见失败失败');
        }
      );
    } else {
      this.toast.presentToast('缺少参数');
    }
  }

  /**
   * 进协办接口处理
   */
  handinxieban() {
    this.mainservice
      .xiebanhandin(this.itemmodel['Id'], this.itemmodel['CoorType'])
      .subscribe(
        res => {
          if (res['State'] === 1) {
            this.toast.presentToast('协办提交成功');
            // 返回列表
            console.log(res);
            this.route.navigate(['tabs']);
          }
        },
        err => {
          this.toast.presentToast('协办提交失败');
        }
      );
  }

  /**
   *
   * @param index 弹出结束提示
   */
  async presentEndAlert() {
    this.alertVC = await this.alertController.create({
      header: '提示',
      message:
        '该提交将会将您的最后一条意见作为部门意见，点击【确定】进行提交，点击【取消】取消提交。',
      buttons: [
        {
          text: '确定',
          cssClass: 'secondary',
          handler: () => {
            this.itemmodel['commitType'] = 400;
            this.route.navigate(['end-action'], {
              queryParams: {
                item: JSON.stringify(this.itemmodel)
              }
            });
          }
        },
        {
          text: '取消',
          role: 'cancle',
          cssClass: 'secondary',
          handler: () => {}
        }
      ]
    });
    this.alertVC.present();
  }

  /**
   * 610直接commit
   */

  /**
   * 提交并分发文件 跳到下一步
   */
  handinandgiveFile() {
    this.itemmodel['commitType'] = '300';
    if (this.itemmodel['commitType'] == 300) {
      this.itemmodel['IsShowNextStep'] = false;
    }
    this.pushNextStep();
  }

  /**
   * 跳到下一步时把上一个人选好的人的数据传下去--正常跳转进入下一步选人
   */
  pushNextStep() {
    this.mainservice
      .commitSimulateEnd(
        this.itemmodel.Id,
        this.itemmodel.ProcessType,
        this.itemmodel.CoorType
      )
      .subscribe(
        (data: any) => {
          // if (data['State'] === 1) {
          var tempArr = data.Data;

          if (!tempArr) {
            tempArr = [];
          }
          this.route.navigate(['person-select'], {
            queryParams: {
              item: JSON.stringify(this.itemmodel),
              hasSelected: JSON.stringify(tempArr)
            }
          });
          // }
          // else {
          //   this.toast.presentToast('已无数据');
          // }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
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
