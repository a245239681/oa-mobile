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
  constructor(
    private mainindexservice: MainindexService,
    private userinfo: UserInfo,
    private toast: CommonHelper,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    console.log(this.data);
  }

  /** 保存 */
  submit() {
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
  }

  /** 关闭模态框 */
  closemodal(data?: any) {
    this.modalController.dismiss({
      result: data
    });
  }
}