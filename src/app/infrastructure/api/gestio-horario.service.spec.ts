import { TestBed } from '@angular/core/testing';

import { GestioHorarioService } from './gestio-horario.service';

describe('GestioHorarioService', () => {
  let service: GestioHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GestioHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
