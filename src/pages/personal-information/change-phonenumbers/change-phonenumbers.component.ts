import { Component, OnInit, Input } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { UserInfo } from 'src/infrastructure/user-info';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-change-phonenumbers',
  templateUrl: './change-phonenumbers.component.html',
  styleUrls: ['./change-phonenumbers.component.scss']
})
export class ChangePhonenumbersComponent implements OnInit {
  /** 开启页面传过来的值 */
  @Input() data: any;

  /** 办公号码、手机号码 */
  sws: any;
  constructor(
    private mainindexservice: MainindexService,
    private userinfo: UserInfo,
    private toast: CommonHelper,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.sws = {
      Mobile: this.data.Mobile,
      Phone: this.data.Phone
    };
  }

  /** 保存 */
  submit() {
    const zz = /^[1][3,4,5,7,8,9][0-9]{9}$/;

    const xx = zz.test(this.sws.Mobile);
    if (xx) {
      this.data.Mobile = this.sws.Mobile;
      this.data.Phone = this.sws.Phone;
      this.mainindexservice.UpdateStaffInfo(this.data).subscribe(
        r => {
          if (r['State'] === 1) {
            this.userinfo.Mobile('Mobile', this.data.Mobile);
            this.userinfo.Phone('Phone', this.data.Phone);
            this.toast.presentToast('修改成功');
            this.closemodal();
          } else {
            this.toast.presentToast('修改失败');
          }
        },
        () => {
          this.toast.presentToast('请求失败');
        }
      );
    } else {
      this.toast.presentToast('手机格式不正确！');
    }
  }

  /** 关闭模态框 */
  closemodal(data?: any) {
    this.modalController.dismiss({
      result: this.sws
    });
  }
}
