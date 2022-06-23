import { Test, TestingModule } from '@nestjs/testing';
import { PollService } from '../poll/poll.service';
import { Repository } from 'typeorm';
import { QuestionService } from './question.service';

describe('QuestionService', () => {
  let service: QuestionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        QuestionService,
        PollService,
        {
          provide: 'QuestionRepository',
          useClass: Repository,
        },
        {
          provide: 'PollRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<QuestionService>(QuestionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
