import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonSelectPage } from './person-select.page';

describe('PersonSelectPage', () => {
  let component: PersonSelectPage;
  let fixture: ComponentFixture<PersonSelectPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonSelectPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonSelectPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
