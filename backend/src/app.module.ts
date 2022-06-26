import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import options from './config/ormconfig';
import { PollModule } from './poll/poll.module';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';
import { VoteModule } from './vote/vote.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    PollModule,
    QuestionModule,
    AnswerModule,
    VoteModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
