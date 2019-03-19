import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-documentpaper',
  templateUrl: './documentpaper.component.html',
  styleUrls: ['./documentpaper.component.scss']
})
export class DocumentpaperComponent implements OnInit {
  // 传进来的itemmodel
  @Input() itemmodel: any;

  constructor() {}

  ngOnInit() {}
}