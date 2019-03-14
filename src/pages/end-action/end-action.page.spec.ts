import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndActionPage } from './end-action.page';

describe('EndActionPage', () => {
  let component: EndActionPage;
  let fixture: ComponentFixture<EndActionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndActionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndActionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
