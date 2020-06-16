import { TestBed } from '@angular/core/testing';

import { OnepagereportService } from './onepagereport.service';

describe('OnepagereportService', () => {
  let service: OnepagereportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnepagereportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
