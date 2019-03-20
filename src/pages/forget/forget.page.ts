import { Component, OnInit } from '@angular/core';
import { ForgetService } from './forget.service';

@Component({
  selector: 'app-forget',
  templateUrl: './forget.page.html',
  styleUrls: ['./forget.page.scss'],
  providers:  [ ForgetService ]
})
export class ForgetPage implements OnInit {

  constructor(private forgetService: ForgetService) { }
 
  ngOnInit() {
    this.forgetService.all();
  }

}
