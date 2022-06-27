import { Test, TestingModule } from '@nestjs/testing';
import { QuestionService } from '../question/question.service';
import { Repository } from 'typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';
import { PollService } from '../poll/poll.service';
import { VoteGateway } from '../vote/vote.gateway';

describe('AnswerController', () => {
  let controller: AnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [
        AnswerService,
        QuestionService,
        PollService,
        VoteGateway,
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

    controller = module.get<AnswerController>(AnswerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
