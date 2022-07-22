import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import options from './config/ormconfig';
import redisOptions from './config/redisconfig';
import { PollModule } from './poll/poll.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { VoteModule } from './vote/vote.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    RedisModule.forRoot(redisOptions),
    PollModule,
    QuestionModule,
    AnswerModule,
    VoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
