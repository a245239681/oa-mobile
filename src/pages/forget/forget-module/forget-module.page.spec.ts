import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForgetModulePage } from './forget-module.page';

describe('ForgetModulePage', () => {
  let component: ForgetModulePage;
  let fixture: ComponentFixture<ForgetModulePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForgetModulePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgetModulePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
