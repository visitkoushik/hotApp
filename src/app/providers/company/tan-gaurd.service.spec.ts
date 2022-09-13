import { TestBed } from '@angular/core/testing';

import { TanGaurdService } from './tan-gaurd.service';

describe('TanGaurdService', () => {
  let service: TanGaurdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TanGaurdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
