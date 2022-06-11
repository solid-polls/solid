import { Module } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { AnswerController } from './answer.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import Answer from '../models/answer';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  controllers: [AnswerController],
  providers: [AnswerService],
  exports: [TypeOrmModule],
})
export class AnswerModule {}
