import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Question from '../models/question';
import { PollModule } from '../poll/poll.module';

@Module({
  imports: [TypeOrmModule.forFeature([Question]), PollModule],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [QuestionService],
})
export class QuestionModule {}
