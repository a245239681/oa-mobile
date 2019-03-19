import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignSusscesPage } from './sign-sussces.page';

describe('SignSusscesPage', () => {
  let component: SignSusscesPage;
  let fixture: ComponentFixture<SignSusscesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignSusscesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignSusscesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
