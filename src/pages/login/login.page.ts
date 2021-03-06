import { CommonHelper } from './../../infrastructure/commonHelper';
import { UserInfo } from './../../infrastructure/user-info';
import { LoginService, loginModel } from './../../service/login/login.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  forRegExpValidator,
  RegularExpression
} from 'src/infrastructure/regular-expression';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { NavController, ModalController, AlertController } from '@ionic/angular';
import { AppVersion } from '@ionic-native/app-version/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

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

  loginInfo: loginModel = {
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

  isUserNameEmpty = false;

  isPasswordEmpty = false;

  isPasswordLow = false;

  constructor(
    private loginservice: LoginService,
    private userinfo: UserInfo,
    private toast: CommonHelper,
    private fb: FormBuilder,
    private mainindexService: MainindexService,
    public nav: NavController,
    private modalController: ModalController,
    private appVision: AppVersion,
    private alertController: AlertController,
    private appBroswer: InAppBrowser
  ) {
    this.creatForm();
    this.checkUpdate();
  }

  /**
   * 检查更新
   */
  checkUpdate() {
    this.mainindexService.checkUpdate().subscribe((res: any) => {
      if (res.State === 1) {
        this.appVision.getVersionNumber().then((visonNumber) => {
          console.log(parseFloat(visonNumber));
          console.log(parseFloat(res['Data']['appVersion']));
          if (parseFloat(visonNumber) < parseFloat(res['Data']['appVersion'])) {
            console.log('请前往更新');
            this.presentUpdate();
          } else {
          }
        });
      }else {
        
      }
    }, err => {

    });
  }

  /**
   * 弹出更新窗口
   */
 async presentUpdate() {
   let alertVC = await this.alertController.create({
      header: '更新提示',
      message:
        '请点击确定前往更新',
      buttons: [
        {
          text: '确定',
          cssClass: 'secondary',
          handler: () => {
            const browser = this.appBroswer.create('https://fir.im/g7sq','_system');
            browser.show();
            return false;
          }
        },
      ],
      keyboardClose: false,
      backdropDismiss: false,
      mode: 'ios'
    });
    alertVC.present();
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
    if (this.loginInfo.username === '' || this.loginInfo.PassWord === '') {
      this.toast.presentToast('用户名或密码不能为空！');
      return;
    }
    if (this.loginInfo.username !== '' && this.loginInfo.PassWord !== '') {
      this.toast.presentLoading();
      this.loginservice.login(this.loginInfo).subscribe(
        res => {
          this.toast.dismissLoading();
          if (res['State'] === 1) {
            const userinfo = res['Data'];
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
            this.userinfo.Birthday(userinfo.Birthday);
            this.nav.navigateRoot('/tabs/tabs');
            this.toast.presentToast(
              '欢迎登陆住房局OA管理系统！',
              'success',
              'toast'
            );
          } else {
            this.toast.presentToast(res['Message']);
          }
        },
        () => {
          this.toast.presentToast('登录失败！');
        }
      );
    }
  }

  onUsernameChange() {
    if (this.loginInfo.username === '') {
      this.isUserNameEmpty = true;
    } else {
      this.isUserNameEmpty = false;
    }
  }

  onPasswordChange() {
    if (this.loginInfo.PassWord === '') {
      this.isPasswordEmpty = true;
    } else {
      if (this.loginInfo.PassWord.length < 3) {
        this.isPasswordLow = true;
      } else {
        this.isPasswordLow = false;
      }
      this.isPasswordEmpty = false;
    }
  }
}
