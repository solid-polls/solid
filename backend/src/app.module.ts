import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import options from './config/ormconfig';
import { PollModule } from './poll/poll.module';
import { VoteGateway } from './vote.gateway';

@Module({
  imports: [TypeOrmModule.forRoot(options), PollModule],
  controllers: [],
  providers: [VoteGateway],
})
export class AppModule {}
