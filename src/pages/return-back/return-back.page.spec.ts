import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReturnBackPage } from './return-back.page';

describe('ReturnBackPage', () => {
  let component: ReturnBackPage;
  let fixture: ComponentFixture<ReturnBackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReturnBackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReturnBackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
