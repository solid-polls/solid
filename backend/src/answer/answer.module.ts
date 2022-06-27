import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Answer from '../models/answer';
import { QuestionModule } from '../question/question.module';
import { VoteModule } from '../vote/vote.module';

@Module({
  imports: [TypeOrmModule.forFeature([Answer]), QuestionModule, VoteModule],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [AnswerService],
})
export class AnswerModule {}
