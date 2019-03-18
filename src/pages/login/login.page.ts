import { CommonHelper } from './../../infrastructure/commonHelper';
import { UserInfo } from './../../infrastructure/user-info';
import { LoginService } from './../../service/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  forRegExpValidator,
  RegularExpression
} from 'src/infrastructure/regular-expression';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { NavController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss']
})
export class LoginPage {
  loginForm: FormGroup;

  formErrors = {
    // 错误信息
    username: '',
    PassWord: ''
  };

  validationMessages = {
    // 错误信息模板
    username: {
      required: '用户名不能为空'
    },
    PassWord: {
      required: '密码不能为空',
      minlength: '密码不能小于3个字符'
    }
  };

  constructor(
    private loginservice: LoginService,
    private userinfo: UserInfo,
    private toast: CommonHelper,
    private fb: FormBuilder,
    private mainindexService: MainindexService,
    public nav: NavController,
    private modalController: ModalController
  ) {
    this.creatForm();
  }

  creatForm() {
    this.loginForm = this.fb.group({
      username: [
        this.userinfo.GetUserName() ? this.userinfo.GetUserName() : '',
        [Validators.required]
      ],
      PassWord: ['', [Validators.required, Validators.minLength(3)]]
    });
    this.loginForm.valueChanges.subscribe(data => {
      this.toast.onInputValueChanged(
        this.loginForm,
        this.formErrors,
        this.validationMessages
      );
    });
    this.toast.onInputValueChanged(
      this.loginForm,
      this.formErrors,
      this.validationMessages
    );
  }
  login(value: any) {
    console.log(value);
    this.loginservice.login(this.loginForm.value).subscribe(res => {
      if (res['State'] === 1) {
        const userinfo = res['Data'];
        console.log(userinfo);
        /**
         * 存token 存名字 存是否是领导
         */
        this.userinfo.SetToken(userinfo['OaApiToken']);
        /** 个人信息 */
        this.userinfo.SetUserName(userinfo.Name);
        this.userinfo.SetUserDegree(userinfo.IsLeader);
        this.userinfo.Sex(userinfo.Sex);
        this.userinfo.Phone(userinfo.Phone);
        this.userinfo.Mobile(userinfo.Mobile);
        this.userinfo.DeptName(userinfo.DeptName);
        const id = userinfo.ID + '';
        this.userinfo.PersonageId(id, 'id');
        console.log(userinfo.ID, userinfo.DeptName);
        this.nav.navigateRoot('/tabs/tabs');
        this.toast.presentToast(
          '欢迎登陆住房局OA管理系统！',
          'success',
          'toast'
        );
      } else {
        this.toast.presentToast('登录失败');
      }
    });
  }

  // 接口测试
  output() {
    // this.mainindexService.getmainindexdata().subscribe((res) => {
    //   console.log(res);
    // });
    // this.mainindexService.getneedtodolist(1).subscribe((res) => {
    //   console.log(res);
    //   this.nav.navigateForward("/tabs/tabs");
    // }, (err) => {
    // });
  }
}
