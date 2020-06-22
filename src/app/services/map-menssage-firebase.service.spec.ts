import { TestBed } from '@angular/core/testing';

import { MapMenssageFirebaseService } from './map-menssage-firebase.service';

describe('MapMenssageFirebaseService', () => {
  let service: MapMenssageFirebaseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapMenssageFirebaseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
