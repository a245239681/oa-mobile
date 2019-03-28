import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';

@Component({
  selector: 'department-select',
  templateUrl: './department-select.component.html',
  styleUrls: ['./department-select.component.scss']
})
export class DepartmentSelectComponent implements OnInit {
  // 1:主办 2：协办 3：收文移交 4: 发文移交
  @Input() selectedType: string;

  @Output() selected = new EventEmitter<{ items: any[]; type: string }>();

  // 列表数据
  @Input() listdataArr: any[] = [];

  @Input() selectedList = [];
  /** 移交选中的数组 */
  selectList = [];
  constructor(
    private mainindexservice: MainindexService,
    private toast: CommonHelper
  ) {}

  ngOnInit() {
  }

  singleSelect(item: any) {
    this.selected.emit({ items: [item], type: this.selectedType });
  }

  mutiSelect(item: any, checked: boolean) {
    if (this.selectedType === '3' || this.selectedType === '4') {
      if (checked) {
        this.selectList.push(item);
      } else {
        // 去掉没选中的如果之前选过的
        this.selectList = this.selectList.filter(data => data.id !== item.id);
      }
      this.selected.emit({ items: this.selectList, type: this.selectedType });
    } else {
      if (checked) {
        this.selectedList.push(item);
      } else {
        // 去掉没选中的如果之前选过的
        this.selectedList = this.selectedList.filter(
          data => data.id !== item.id
        );
      }
      this.selected.emit({
        items: this.selectedList,
        type: this.selectedType
      });
    }
  }
}
