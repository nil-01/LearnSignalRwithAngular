import { TestBed } from '@angular/core/testing';

import { SignalrserviceService } from './signalrservice.service';

describe('SignalrserviceService', () => {
  let service: SignalrserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SignalrserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
