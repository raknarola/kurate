/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ValidationsService } from './validations.service';

describe('Service: Validations', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ValidationsService]
    });
  });

  it('should ...', inject([ValidationsService], (service: ValidationsService) => {
    expect(service).toBeTruthy();
  }));
});
