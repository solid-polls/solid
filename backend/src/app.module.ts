import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import options from './config/ormconfig';
import { PollModule } from './poll/poll.module';

@Module({
  imports: [TypeOrmModule.forRoot(options), PollModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
