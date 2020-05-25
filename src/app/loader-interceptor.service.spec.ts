import { TestBed, inject } from '@angular/core/testing';

import { LoaderInterceptor } from './loader-interceptor.service';

describe('LoaderInterceptor', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoaderInterceptor]
    });
  });

  it('should be created', inject([LoaderInterceptor], (service: LoaderInterceptor) => {
    expect(service).toBeTruthy();
  }));
});
