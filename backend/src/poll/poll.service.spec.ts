import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { PollService } from './poll.service';

describe('PollService', () => {
  let service: PollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PollService,
        {
          provide: 'PollRepository',
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<PollService>(PollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
