import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-sussces',
  templateUrl: './sign-sussces.page.html',
  styleUrls: ['./sign-sussces.page.scss'],
})
export class SignSusscesPage implements OnInit {

  constructor(private route: Router, ) { }

  ngOnInit() {
  }

  back() {
    this.route.navigate(['tabs']);
  }
}
