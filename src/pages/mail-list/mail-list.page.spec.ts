import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailListPage } from './mail-list.page';

describe('MailListPage', () => {
  let component: MailListPage;
  let fixture: ComponentFixture<MailListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
