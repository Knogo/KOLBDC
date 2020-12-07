import { TestBed } from '@angular/core/testing';

import { AddCredentialsInterceptor } from './add-credentials.interceptor';

describe('AddCredentialsInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AddCredentialsInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: AddCredentialsInterceptor = TestBed.inject(AddCredentialsInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
