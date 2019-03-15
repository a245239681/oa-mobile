import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SecretinfoadvicePage } from './secretinfoadvice.page';

describe('SecretinfoadvicePage', () => {
  let component: SecretinfoadvicePage;
  let fixture: ComponentFixture<SecretinfoadvicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SecretinfoadvicePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SecretinfoadvicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
