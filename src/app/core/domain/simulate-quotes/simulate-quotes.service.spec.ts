import { TestBed } from '@angular/core/testing';

import { SimulateQuotesService } from './simulate-quotes.service';

describe('SimulateQuotesService', () => {
  let service: SimulateQuotesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SimulateQuotesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
