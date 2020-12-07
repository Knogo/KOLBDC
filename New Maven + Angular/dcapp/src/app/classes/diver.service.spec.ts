import { TestBed } from '@angular/core/testing';

import { DiverService } from './diver.service';

describe('DiverService', () => {
  let service: DiverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DiverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
