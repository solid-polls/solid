import { Module } from '@nestjs/common';
import { PollService } from './poll.service';
import { PollController } from './poll.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Poll from '../models/poll';

@Module({
  imports: [TypeOrmModule.forFeature([Poll])],
  controllers: [PollController],
  providers: [PollService],
  exports: [TypeOrmModule],
})
export class PollModule {}
