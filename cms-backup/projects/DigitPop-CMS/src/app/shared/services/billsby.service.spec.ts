import { TestBed } from '@angular/core/testing';

import { BillsbyService } from './billsby.service';

describe('BillsbyService', () => {
  let service: BillsbyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BillsbyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
