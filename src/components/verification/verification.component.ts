import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-verification',
  templateUrl: './verification.component.html',
  styleUrls: ['./verification.component.scss'],
})
export class VerificationComponent  {

  @Input() text: string;

  constructor() { }


}
