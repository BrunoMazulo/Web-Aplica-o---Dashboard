import { TestBed } from '@angular/core/testing';

import { BandejaxService } from './bandejax.service';

describe('BandejaxService', () => {
  let service: BandejaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BandejaxService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
