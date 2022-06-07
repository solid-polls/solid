import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PollModule } from './poll/poll.module';
import { PollService } from './poll/poll.service';
import options from './config/ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(options), PollModule],
  controllers: [],
  providers: [PollService],
})
export class AppModule {}
