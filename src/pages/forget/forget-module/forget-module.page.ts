import { Component, OnInit } from '@angular/core';
import { ForgetService } from '../forget.service';

@Component({
  selector: 'app-forget-module',
  templateUrl: './forget-module.page.html',
  styleUrls: ['./forget-module.page.scss'],
})
export class ForgetModulePage implements OnInit {
  header = {
    name: "23"
  }
  
  constructor(private forgetService: ForgetService) { }
  
  ngOnInit() {
    this.forgetService.all();
  }

}
