import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HavedoneworkPage } from './havedonework.page';

describe('HavedoneworkPage', () => {
  let component: HavedoneworkPage;
  let fixture: ComponentFixture<HavedoneworkPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HavedoneworkPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HavedoneworkPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
