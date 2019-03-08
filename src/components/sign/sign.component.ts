import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-sign',
  templateUrl: './sign.component.html',
  styleUrls: ['./sign.component.scss'],
})
export class SignComponent implements OnInit {

  @Input() itemmodel:any;
  
  constructor() { }

  ngOnInit() {}

}
