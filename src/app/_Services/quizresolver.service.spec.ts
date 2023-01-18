import { TestBed } from '@angular/core/testing';

import { QuizresolverService } from './quizresolver.service';

describe('QuizresolverService', () => {
  let service: QuizresolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(QuizresolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
