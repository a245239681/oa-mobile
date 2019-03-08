import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DocumentdetailPage } from './documentdetail.page';

describe('DocumentdetailPage', () => {
  let component: DocumentdetailPage;
  let fixture: ComponentFixture<DocumentdetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DocumentdetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DocumentdetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
