import { CommonHelper } from './../../infrastructure/commonHelper';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MainindexService } from './../../service/maiindex/mainindex.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-secretinfoadvice',
  templateUrl: './secretinfoadvice.page.html',
  styleUrls: ['./secretinfoadvice.page.scss'],
})
export class SecretinfoadvicePage implements OnInit {

  textAreaValue: string = '';

  itemmodel: any;

  title: string;
  constructor(private mainservice: MainindexService, private toast: CommonHelper, private activeRouter: ActivatedRoute, private route: Router) {
    this.activeRouter.queryParams.subscribe((params: Params) => {
      this.itemmodel = JSON.parse(params['item']);
      this.title = params['title'];
    });
  }

  ngOnInit() {
  }

  handinclick() {
    
    if (this.textAreaValue.length == 0) {
      this.toast.presentToast('请填写' + this.title);
      return;
    }
    if (this.title == '公开信息意见') {
      this.mainservice.OpenInfoAdvice(this.itemmodel['Id'], this.textAreaValue).subscribe((res) => {
        if (res['State'] == 1) {
          this.route.navigate(['send-action-tree'], {
            queryParams: {
              item: JSON.stringify(this.itemmodel)
            }
          })
        }
      });
    }
    else {
      this.mainservice.SecretInfoAdvice(this.itemmodel['Id'], this.textAreaValue).subscribe((res) => {
        if (res['State'] == 1) {
          this.route.navigate(['send-action-tree'], {
            queryParams: {
              item: JSON.stringify(this.itemmodel)
            }
          })
        }
      });
    }

  }
}
