import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendActionTreePage } from './send-action-tree.page';

describe('SendActionTreePage', () => {
  let component: SendActionTreePage;
  let fixture: ComponentFixture<SendActionTreePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendActionTreePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendActionTreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
