import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { AnswerController } from './answer.controller';
import { AnswerService } from './answer.service';

describe('AnswerController', () => {
  let controller: AnswerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AnswerController],
      providers: [
        AnswerService,
        {
          provide: 'QuestionRepository',
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
