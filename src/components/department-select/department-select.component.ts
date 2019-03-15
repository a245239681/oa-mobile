import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'department-select',
  templateUrl: './department-select.component.html',
  styleUrls: ['./department-select.component.scss']
})
export class DepartmentSelectComponent implements OnInit {
  @Input() isSingleSlect: string;

  @Input() hasSelected: any;

  @Output() selected = new EventEmitter<{ items: any[] }>();

  // 列表数据
  listdataArr: any[] = [];

  // 移交列表数组
  handoverListdataArr: any[] = [];
  selectedList = [];

  constructor(
    private mainindexservice: MainindexService,
    private toast: CommonHelper
  ) {}

  ngOnInit() {
    if (this.isSingleSlect === '3') {
      this.handoverListdataArr = this.hasSelected;
    }

    this.mainindexservice.getDeptTreeUntilMainDept().subscribe(
      res => {
        if (res['State'] === 1) {
          this.listdataArr = res['Data'];
          for (let i = 0; i < this.listdataArr.length; i++) {
            if (this.isSingleSlect) {
              if (this.listdataArr[i].id === this.hasSelected.PrimaryDeptId) {
                this.listdataArr[i].checked = true;
                this.selectedList.push(this.listdataArr[i]);
              }
            } else {
              this.hasSelected.Cooperaters.forEach((element: string) => {
                if (this.listdataArr[i].id === element) {
                  this.listdataArr[i].checked = true;
                  this.selectedList.push(this.listdataArr[i]);
                }
              });
            }
          }
          this.selected.emit({ items: this.selectedList });
          // console.log('==========', this.listdataArr);
        } else {
          this.toast.presentToast('已无数据');
        }
      },
      err => {
        this.toast.presentToast('请求失败');
      }
    );
  }

  singleSelect(item: any) {
    console.log(item);
    this.selected.emit({ items: [item] });
  }

  mutiSelect(item: any, checked: boolean) {
    // console.log('==========', this.listdataArr);
    if (checked) {
      this.selectedList.push(item);
    } else {
      //去掉没选中的如果之前选过的
      this.selectedList = this.selectedList.filter(data => data.id !== item.id);
    }
    this.selected.emit({ items: this.selectedList });
  }
}
