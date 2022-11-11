import { TestBed } from '@angular/core/testing';

import { Proveedor1Service } from './proveedor1.service';

describe('Proveedor1Service', () => {
  let service: Proveedor1Service;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Proveedor1Service);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
