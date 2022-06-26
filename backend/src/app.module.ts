import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import options from './config/ormconfig';
import { PollModule } from './poll/poll.module';
import { VoteGateway } from './vote/vote.gateway';
import { QuestionModule } from './question/question.module';
import { AnswerModule } from './answer/answer.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(options),
    PollModule,
    QuestionModule,
    AnswerModule,
  ],
  controllers: [],
  providers: [VoteGateway],
})
export class AppModule {}
