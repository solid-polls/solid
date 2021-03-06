import { Test, TestingModule } from '@nestjs/testing';
import { PollService } from '../poll/poll.service';
import { Repository } from 'typeorm';
import { QuestionController } from './question.controller';
import { QuestionService } from './question.service';

describe('QuestionController', () => {
  let controller: QuestionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestionController],
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

    controller = module.get<QuestionController>(QuestionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
