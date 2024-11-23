import { TestBed } from '@angular/core/testing';

import { ChekFormService } from './chek-form.service';

describe('ChekFormService', () => {
  let service: ChekFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChekFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
