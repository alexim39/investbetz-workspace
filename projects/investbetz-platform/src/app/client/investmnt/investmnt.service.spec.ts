import { TestBed } from '@angular/core/testing';

import { InvestmntService } from './investmnt.service';

describe('InvestmntService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InvestmntService = TestBed.get(InvestmntService);
    expect(service).toBeTruthy();
  });
});
