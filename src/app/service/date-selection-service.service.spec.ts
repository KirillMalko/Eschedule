import { TestBed } from '@angular/core/testing';

import { DateSelectionServiceService } from './date-selection-service.service';

describe('DateselectionServiceService', () => {
  let service: DateSelectionServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateSelectionServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
