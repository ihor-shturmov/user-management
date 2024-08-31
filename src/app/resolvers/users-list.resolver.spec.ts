import { TestBed } from '@angular/core/testing';
import { ResolveFn } from '@angular/router';

import { usersListResolver } from './users-list.resolver';

describe('usersListResolver', () => {
  const executeResolver: ResolveFn<boolean> = (...resolverParameters) => 
      TestBed.runInInjectionContext(() => usersListResolver(...resolverParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeResolver).toBeTruthy();
  });
});
