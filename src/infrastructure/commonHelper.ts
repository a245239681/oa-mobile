import { Injectable } from '@angular/core';
import { ToastController, LoadingController } from '@ionic/angular';
import { FormGroup } from '../../node_modules/@angular/forms';
import { ToastOptions } from '@ionic/core';

@Injectable()
export class CommonHelper {
  toast: HTMLIonToastElement;

  loading: HTMLIonLoadingElement;
  /**
   *
   */
  constructor(
    public toastController: ToastController,
    private loadingCtrl: LoadingController
  ) {}

  /**
   * 显示toast
   * @param message 提示信息
   * @param duration 显示时间
   * @param position 显示位置，接受值 "top", "middle", "bottom"
   * @param showCloseButton 是否显示关闭按钮
   */
  public async presentToast(
    message: string = '操作完成',
    color: string = 'success',
    cssClass: string = 'toastClass',
    mode: string = 'ios',
    position: string = 'top',
    options?: ToastOptions
  ) {
    // tslint:disable-next-line:no-unused-expression
    this.toast && this.toast.dismiss();
    this.toast = await this.toastController.create(
      Object.assign(
        {
          message: message,
          duration: 2000,
          color: color,
          mode: mode,
          cssClass: cssClass,
          position: position,
          showCloseButton: false
        },
        options
      )
    );
    this.toast.present();
  }

  private isLoading: Boolean;
  private retryCount: number = 0;
  showLoading = true;
  /**
   * 阻止紧接下来的一次加载loading。
   */
  preventLoading() {
    this.showLoading = false;
    setTimeout(() => (this.showLoading = true), 0);
  }

  /**
   * 弹出loading
   * @param content 显示内容
   */
  public async presentLoading(content?: string) {
    if (this.isLoading == true || !this.showLoading) {
      return;
    }

    this.isLoading = true;
    this.loading = await this.loadingCtrl.create({
      message: content,
      translucent: true,
      spinner: 'bubbles',
      mode: 'ios',
      cssClass: 'logading-class'
    });
    await this.loading.present();
  }
  /**
   * 关闭loading
   */
  public async dismissLoading() {
    if (this.isLoading == true) {
      if (this.loading == null) {
        if (this.retryCount > 5) {
          this.retryCount = 0;
          return;
        }
        setTimeout(() => {
          this.retryCount++;
          this.dismissLoading();
        }, 500);
        return;
      }
      this.retryCount = 0;
      this.isLoading = false;
      this.loading.dismiss();
      this.loading = null;
    }
  }

  /**
   * 表单值改变处理错误信息方法
   * @param RegisterForm
   * @param formErrors
   */
  onInputValueChanged(
    RegisterForm: FormGroup,
    formErrors: any,
    validationMessages: any
  ) {
    if (!RegisterForm) {
      return;
    }
    const form = RegisterForm;
    for (const field in formErrors) {
      if (formErrors.hasOwnProperty(field)) {
        formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const message = validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key) && message[key]) {
              formErrors[field] += message[key];
            }
          }
        }
      }
    }
  }

  private time: boolean;

  timeAdd() {
    this.time = true;
  }

  isTimetrue(): boolean {
    return this.time;
  }
}
