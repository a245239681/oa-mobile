import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-documentdetail',
  templateUrl: './documentdetail.page.html',
  styleUrls: ['./documentdetail.page.scss']
})
export class DocumentdetailPage implements OnInit {
  /**
   * 列表传进来的item
   */
  itemmodel: any;

  // 标题切换
  title = '办理信息';

  /**
   * 1 办理信息 2 流转信息 3 办文签  4 附件列表
   */
  type = '1';

  // 收发文类型 1 收文 2 发文 3 传阅
  documenttype: number;

  constructor(
    private activeRoute: ActivatedRoute,
    private route: Router,
    private nav: NavController
  ) {
    this.activeRoute.queryParams.subscribe((params: Params) => {
      console.log(params);
      this.itemmodel = JSON.parse(params['item']);
    });
    /** 拟办意见的显示隐藏 */
  }

  ngOnInit() {}

  nbyj() {
    if (this.type === '1') {
      if (
        this.itemmodel['Operationlist'] !== '已办收文' &&
        this.itemmodel['Operationlist'] !== '已办发文'
      ) {
        return true;
      } else {
        return false;
      }
    } else {
      return false;
    }
  }

  segmentChanged(event: any) {
    console.log('Segment changed', event.target.value);
    this.type = event.target.value;
    switch (event.target.value) {
      case '1':
        this.title = '办理信息';
        break;
      case '2':
        this.title = '流转信息';
        break;
      case '3':
        this.title = '附件管理';
        break;
      case '4':
        this.title = '办文签';
        break;
      case '5':
        this.title = '发文签';
        break;
      default:
        this.title = '相关公文';
    }
  }

  pushtoadvice() {
    this.itemmodel['IsShowNextStep'] = true;
    this.route.navigate(['submission'], {
      queryParams: {
        item: JSON.stringify(this.itemmodel)
      }
    });
  }

  /**
   * 返回
   */
  canGoBack() {
    history.back();
    return false;
  }
}
