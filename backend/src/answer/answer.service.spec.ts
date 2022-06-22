import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from '../question/question.service';
import { Repository } from 'typeorm';
import { AnswerService } from './answer.service';
import { PollService } from '../poll/poll.service';

describe('AnswerService', () => {
  let service: AnswerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AnswerService,
        QuestionService,
        PollService,
        {
          provide: 'AnswerRepository',
          useClass: Repository,
        },
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

    service = module.get<AnswerService>(AnswerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
