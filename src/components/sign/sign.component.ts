import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss']
})
export class SignComponent implements OnInit {
  @Input() itemmodel: any;
  @Input() documenttype: any;
  title: string;
  constructor() {
    console.log('构造函数');
  }

  ngOnInit() {
    console.log(this.itemmodel);
    if (this.itemmodel.documenttype === 1) {
      this.title = '收文登记表';
    } else if (this.itemmodel.documenttype === 2) {
      this.title = '发文拟稿';
    } else if (this.itemmodel.documenttype === 3) {
      this.title = '发文拟稿';
    }
  }
}
