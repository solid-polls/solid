import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PollController } from './poll.controller';
import { PollService } from './poll.service';

describe('PollController', () => {
  let controller: PollController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PollController],
      providers: [
        PollService,
        {
          provide: 'PollRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    controller = module.get<PollController>(PollController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
