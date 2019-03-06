import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainIndexPage } from './main-index.page';

describe('MainIndexPage', () => {
  let component: MainIndexPage;
  let fixture: ComponentFixture<MainIndexPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MainIndexPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainIndexPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
