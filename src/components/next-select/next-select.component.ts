import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { MainindexService } from 'src/service/maiindex/mainindex.service';
import { CommonHelper } from 'src/infrastructure/commonHelper';

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

  departmentTree: any[];

  showList: any[];

  buttonList: any[];

  parentNode = null; // 父节点
  node = null; // 节点

  ngOnInit() {
    switch (this.state) {
      case '0':
        this.buttonList = [{
          id: 'root',
          text: '下一步'
        }];
        this.departmentTree = [{
          id: '局领导',
          text: '局领导',
          children: [],
        }, {
          id: '拟办',
          text: '拟办',
          children: [],
        }];
        break;
      case '1':
        this.buttonList = [{
          id: 'root',
          text: '传阅'
        }];
        this.departmentTree = [{
          id: '1',
          text: '南宁市住房保障和房产管理局',
          children: [],
        }];
        break;
    }
    this.showList = this.departmentTree;
  }

  /**
   * 目录点击事件
   * @param item 该目录
   */
  indexClick(item: any) {
    if (item.id === 'root') {
      this.showList = this.departmentTree;
    } else {
      this.showList = this.getNode(this.departmentTree, item.id).children;
    }
    this.popMenu(item.id);
  }

  /**
   * 行点击事件
   * @param item 该行数据
   */
  itemClick(item: any) {
    if (item.attributes) {
      if (item.attributes.NodeType !== 'Dept') { return; }
    }
    this.buttonList.push({
      id: item.id,
      text: item.text,
    });
    switch (item.id) {
      case '局领导':
        if (item.children.length === 0) {
          this.getLeader((list) => {
            item.children = list;
            this.showList = item.children;
          });
        } else {
          this.showList = item.children;
        }
        break;
      case '拟办':
        if (item.children.length === 0) {
          this.getDept((list) => {
            item.children = list;
            this.showList = item.children;
          });
        } else {
          this.showList = item.children;
        }
        break;
      default:
        if (item.children.length === 0) {
          this.getPerson(item.id, (list) => {
            item.children = list;
            this.showList = item.children;
          });
        } else {
          this.showList = item.children;
        }
        break;
    }
  }

  /**
   * 搜索所有列表
   * @param id id
   */
  searchList(id: string) {
  }

  /**
   * 勾选事件
   * @param item 该行数据
   * @param checked 是否选中
   */
  checkboxClick(item: any, checked: boolean) {
  }

  /**
   * 获取一级部门
   * @param fun 回调
   */
  getDept(fun: (list: any) => void) {
    this.mainindexservice.getDeptTreeUntilMainDept().subscribe((res) => {
      if (res['State'] === 1) {
        fun(res.Data);
      } else {
        this.toast.presentToast('已无数据');
      }
    }, () => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 获取局领导
   * @param fun 回调
   */
  getLeader(fun: (list: any) => void) {
    this.mainindexservice.getLeaderTree().subscribe((res) => {
      if (res['State'] === 1) {
        fun(res.Data.children);
      } else {
        this.toast.presentToast('已无数据');
      }
    }, () => {
      this.toast.presentToast('请求失败');
    });
  }

  /**
   * 获取部门人员
   * @param fun 回调
   * @param id 部门id
   */
  getPerson(id: string, fun: (list: any) => void) {
    this.mainindexservice.getDeptTreeCY(id).subscribe((res) => {
      if (res['State'] === 1) {
        fun(res.Data);
      } else {
        this.toast.presentToast('已无数据');
      }
    }, () => {
      this.toast.presentToast('请求失败');
    });
  }


  /**
   * 目录跳转
   * @param id 目录id
   */
  popMenu(id: string) {
    const newList = [];

    for (let i = 0; i < this.buttonList.length; i++) {
      newList.push(this.buttonList[i]);
      if (this.buttonList[i].id === id) {
        break;
      }
    }

    this.buttonList = newList;
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
