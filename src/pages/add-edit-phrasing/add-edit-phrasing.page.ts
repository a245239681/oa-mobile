import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {
  NavController,
  AlertController,
  ModalController
} from '@ionic/angular';
import {
  MainindexService,
  DailySaveModel
} from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'app-add-edit-phrasing',
  templateUrl: './add-edit-phrasing.page.html',
  styleUrls: ['./add-edit-phrasing.page.scss']
})
export class AddEditPhrasingPage implements OnInit {
  /** 开启页面传过来的值 */
  @Input() data: any;
  Title: String;
  text: string;
  mydata: DailySaveModel = {
    ID: '',
    Staff_ID: '',
    Amount: 0,
    Text: ''
  };
  staffId: string;
  public ale: HTMLIonAlertElement;
  constructor(
    private toast: CommonHelper,
    private nav: NavController,
    private modalController: ModalController,
    private mainservice: MainindexService
  ) {}

  ngOnInit() {
    this.Title = this.data.title === '添加' ? '添加常用语' : '修改常用语';
    this.staffId = localStorage.getItem('id');
    if (this.data.data) {
      this.text = this.data.data.Text;
    }
  }
  // async presentAlert() {
  //   this.ale = await this.alertController.create({
  //     // header: 'Alert',
  //     // subHeader: 'Subtitle',
  //     message: '保存成功'
  //     // buttons: ['OK']
  //   });

  //   await this.ale.present();
  //   this.ale.dismiss();
  //   // setTimeout(function() {}, 2000);
  // }
  /** 返回 */
  canGoBack() {
    this.nav.back();
  }
  /** 保存 */
  submit() {
    if (this.data.data) {
      this.mydata.ID = this.data.data.ID;
      this.mydata.Staff_ID = this.staffId;
      this.mydata.Text = this.text;
      this.mainservice.DailySave(this.mydata).subscribe(res => {
        if (res === true) {
          this.toast.presentToast('编辑成功');
          this.closemodal('change');
        } else {
          this.toast.presentToast(res + '');
        }
      });
    } else {
      this.mydata.ID = '0';
      this.mydata.Staff_ID = this.staffId;
      this.mydata.Text = this.text;
      this.mainservice.DailySave(this.mydata).subscribe(res => {
        if (res === true) {
          this.toast.presentToast('添加成功');
          this.closemodal('change');
        } else {
          this.toast.presentToast(res + '');
        }
      });
    }
    // this.presentAlert();
  }
  /** 关闭模态框 */
  closemodal(data?: any) {
    this.modalController.dismiss({
      result: data
    });
  }
}
