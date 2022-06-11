import { Test, TestingModule } from '@nestjs/testing';
import { PollModule } from './poll.module';
import { PollService } from './poll.service';

describe('PollService', () => {
  let service: PollService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PollModule],
      providers: [PollService],
    }).compile();

    service = module.get<PollService>(PollService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
