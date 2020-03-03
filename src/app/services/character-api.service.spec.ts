import { TestBed } from '@angular/core/testing';

import { CharacterApiService } from './character-api.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('CharacterApiService', () => {
  let service: CharacterApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(CharacterApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
