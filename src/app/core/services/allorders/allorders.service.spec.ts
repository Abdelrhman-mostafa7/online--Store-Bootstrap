import { TestBed } from '@angular/core/testing';

import { AllordersService } from './allorders.service';

describe('AllordersService', () => {
  let service: AllordersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllordersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
