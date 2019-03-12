import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'department-select',
  templateUrl: './department-select.component.html',
  styleUrls: ['./department-select.component.scss'],
})
export class DepartmentSelectComponent implements OnInit {

  @Input() isSingleSlect = false;

  @Output() selected = new EventEmitter<{ items: any[] }>();

  // 列表数据
  listdataArr: any[] = [];

  selectedList = [];

  constructor(
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
  ) { }

  ngOnInit() {
    this.mainindexservice.getDeptTreeUntilMainDept().subscribe((res) => {
      if (res['State'] === 1) {
        this.listdataArr = res['Data'];
        console.log(this.listdataArr);
      } else {
        this.toast.presentToast('已无数据');
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  singleSelect(item: any) {
    this.selected.emit({ items: [item] });
  }

  mutiSelect(item: any, checked: boolean) {
    if (checked) {
      this.selectedList.push(item);
    } else {
      //去掉没选中的如果之前选过的
      this.selectedList = this.selectedList.filter(data => data.id === item.id);
    }
    this.selected.emit({ items: this.selectedList });
  }
}