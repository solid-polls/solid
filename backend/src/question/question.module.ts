import { Module } from '@nestjs/common';
import { QuestionService } from './question.service';
import { QuestionController } from './question.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Question from '../models/question';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  controllers: [QuestionController],
  providers: [QuestionService],
  exports: [TypeOrmModule],
})
export class QuestionModule {}
