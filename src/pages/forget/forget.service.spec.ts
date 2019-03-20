import { TestBed } from '@angular/core/testing';

import { ForgetService } from './forget.service';

describe('ForgetService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ForgetService = TestBed.get(ForgetService);
    expect(service).toBeTruthy();
  });
});
