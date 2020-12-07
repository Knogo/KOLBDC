import { TestBed } from '@angular/core/testing';

import { CreatorGuard } from './creator.guard';

describe('CreatorGuard', () => {
  let guard: CreatorGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CreatorGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
