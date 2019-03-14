import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {

  @Input() itemmodel: any;

  constructor() { 
    console.log('构造函数');
  }

  ngOnInit() {
    console.log('进入init方法')
   }

}
