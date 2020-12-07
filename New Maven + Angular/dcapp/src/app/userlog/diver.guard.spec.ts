import { TestBed } from '@angular/core/testing';

import { DiverGuard } from './diver.guard';

describe('DiverGuard', () => {
  let guard: DiverGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(DiverGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
