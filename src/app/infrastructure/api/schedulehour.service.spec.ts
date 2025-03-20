import { TestBed } from '@angular/core/testing';

import { SchedulehourService } from './schedulehour.service';

describe('SchedulehourService', () => {
  let service: SchedulehourService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SchedulehourService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
