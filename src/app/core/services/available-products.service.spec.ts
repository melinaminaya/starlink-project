import { TestBed } from '@angular/core/testing';

import { AvailableProductsService } from './available-products.service';

describe('AvailableProductsService', () => {
  let service: AvailableProductsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AvailableProductsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
