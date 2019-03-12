import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';
import { Observable } from 'rxjs';
import { async } from 'q';
import { DepartmentSelectComponent } from '../department-select/department-select.component';
import { getNodeInjectable } from '@angular/core/src/render3/di';

@Component({
  selector: 'next-select',
  templateUrl: './next-select.component.html',
  styleUrls: ['./next-select.component.scss'],
})
export class NextSelectComponent implements OnInit {

  constructor(
    private mainindexservice: MainindexService,
    private toast: CommonHelper,
  ) { }

  /**
   * 状态 0：下一步 1：传阅
   */
  @Input() state: string;

  /**
   * 勾选回调
   */
  @Output() selected = new EventEmitter<{ items: any }>();

  /**
   * 层级按钮列表
   */
  buttonList = [];

  /**
   * 下一步第一层显示的列表
   */
  mainList = [{
    text: '局领导',
    id: 'root',
  }, {
    text: '拟办',
    id: 'root',
  }];

  /**
   * 页面显示的列表
   */
  showList = [];

  /**
   * 所有部门人员列表
   */
  allList = [];

  /**
   * 局领导列表
   */
  leaderList = [];

  /**
   * 已选列表 staffId：人员Id deptId：部门Id
   */
  selectList = {
    staffId: [],
    deptId: [],
  };

  parentNode = null; // 父节点
  node = null; // 节点

  ngOnInit() {
    switch (this.state) {
      case '0':
        this.showList = this.mainList;
        this.buttonList.push({
          text: '下一步',
          id: 'root',
        });
        break;
    }
  }

  /**
   * 目录点击事件
   * @param item 该目录
   * @param index Index
   */
  indexClick(item: any, index: number) {
    if (index === this.buttonList.length - 1) { return; }
    switch (item.text) {
      case '下一步':
        this.showList = this.mainList;
        this.buttonList = [{
          text: '下一步',
          id: 'root',
        }];
        break;
      case '局领导':
        this.showList = this.leaderList;
        this.buttonList = [{
          text: '下一步',
          id: 'root',
        }, {
          text: '局领导',
          id: 'root',
        }];
        break;
      case '拟办':
        this.showList = this.allList;
        this.buttonList = [{
          text: '下一步',
          id: 'root',
        }, {
          text: '拟办',
          id: 'root',
        }];
        break;
      default:
        this.popMenu(item.text);
        this.showList = this.findDepartment(this.allList, item.id);
        break;
    }
  }

  /**
   * 行点击事件
   * @param item 该行数据
   * @param index Index
   */
  itemClick(item: any) {
    switch (item.text) {
      case '局领导':
        this.buttonList.push({
          text: '局领导',
          id: 'root',
        });
        if (this.leaderList.length === 0) {
          this.getLeader(() => {
            this.showList = this.leaderList;
          });
        } else {
          this.showList = this.leaderList;
        }
        break;
      case '拟办':
        this.buttonList.push({
          text: '拟办',
          id: 'root',
        });
        if (this.allList.length === 0) {
          this.getDept(() => {
            this.showList = this.allList;
          });
        } else {
          this.showList = this.allList;
        }
        break;
      default:
        if (item['attributes']['NodeType'] !== 'Dept') { return; }
        this.buttonList.push({
          text: item.text,
          id: item.id,
        });
        if (item.children.length !== 0) {
          this.showList = item.children;
        } else {
          this.getPerson((list) => {
            this.showList = list;
          }, item.id);
        }
        break;
    }
  }

  /**
   * 获取一级部门
   * @param fun 回调
   */
  getDept(fun: () => void) {
    this.mainindexservice.getDeptTreeUntilMainDept().subscribe((res) => {
      if (res['State'] === 1) {
        this.allList = res.Data;
        fun();
      } else {
        this.toast.presentToast('已无数据');
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
 * 获取局领导
 * @param fun 回调
 */
  getLeader(fun: () => void) {
    this.mainindexservice.getLeaderTree().subscribe((res) => {
      if (res['State'] === 1) {
        this.leaderList = res.Data.children;
        fun();
      } else {
        this.toast.presentToast('已无数据');
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 获取部门人员
   * @param fun 回调
   * @param id 部门id
   */
  getPerson(fun: (list: any) => void, id: string) {
    this.mainindexservice.getDeptTreeCY(id).subscribe((res) => {
      if (res['State'] === 1) {
        fun(res.Data);
      } else {
        this.toast.presentToast('已无数据');
      }
    }, err => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 目录跳转
   * @param text 目录名
   */
  popMenu(text: string) {
    const newList = [];

    for (let i = 0; i < this.buttonList.length; i++) {
      newList.push = this.buttonList[i];
      if (this.buttonList[i].text === text) {
        break;
      }
    }

    this.buttonList = newList;
  }

  /**
   * 获取部门
   * @param list 部门树
   * @param id 部门id
   */
  findDepartment(list: any, id: string) {
    this.parentNode = null;
    this.node = null;
    const res = this.getNode(list, id);
    return res;
  }

  /**
   * 树递归查找
   * @param json 要查找的Json
   * @param nodeId 要查找的节点Id
   */
  getNode(json: any, nodeId: string) {
    console.log('要查询的节点为：' + nodeId);
    // 1.第一层 root 深度遍历整个json
    for (let i = 0; i < json.length; i++) {
      if (this.node) {
        break;
      }
      const obj = json[i];
      // 没有就下一个
      if (!obj || !obj.id) {
        continue;
      }
      // 2.有节点就开始找，一直递归下去
      if (obj.id === nodeId) {
        console.log('ok ... ');
        this.node = obj; // 找到了与nodeId匹配的节点，结束递归
        break;
      } else {
        // 3.如果有子节点就开始找
        if (obj.children.length !== 0) {
          this.parentNode = obj; // 4.递归前记录当前节点，作为父节点
          this.getNode(obj.children, nodeId); // 递归往下找
        } else {
          break; // 跳出递归返回上层递归
        }
      }
    }
    // 如果没有找到父节点，则自己是根节点
    if (!this.parentNode) {
      this.parentNode = 'root';
    }

    // 返回节点内容
    return this.node;
  }
}
