import { TestBed, inject } from '@angular/core/testing';

import { PlayersDataService } from './players-data.service';

describe('PlayersDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlayersDataService]
    });
  });

  it('should be created', inject([PlayersDataService], (service: PlayersDataService) => {
    expect(service).toBeTruthy();
  }));
});
