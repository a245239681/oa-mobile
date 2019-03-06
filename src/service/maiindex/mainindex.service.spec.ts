import { TestBed } from '@angular/core/testing';

import { MainindexService } from './mainindex.service';

describe('MainindexService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MainindexService = TestBed.get(MainindexService);
    expect(service).toBeTruthy();
  });
});
