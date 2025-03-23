import { TestBed } from '@angular/core/testing';

import { DependienteService } from './dependiente.service';

describe('DependienteService', () => {
  let service: DependienteService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DependienteService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
