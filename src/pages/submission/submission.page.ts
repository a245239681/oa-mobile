import { ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-submission',
  templateUrl: './submission.page.html',
  styleUrls: ['./submission.page.scss'],
})
export class SubmissionPage implements OnInit {

  //传进来的公文模型
  itemmodel:any;

  constructor(private activeroute: ActivatedRoute) {
    this.activeroute.queryParams.subscribe((params: Params) => {
      console.log(JSON.parse(params['item']));
    });
  }

  ngOnInit() {
  }

}
