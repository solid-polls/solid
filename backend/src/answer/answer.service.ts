import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Answer from '../models/answer';
import { QuestionService } from '../question/question.service';
import { Repository } from 'typeorm';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { VoteGateway } from '../vote/vote.gateway';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';

@Injectable()
export class AnswerService {
  constructor(
    @InjectRepository(Answer)
    private answerRepository: Repository<Answer>,
    @Inject(QuestionService)
    private questionService: QuestionService,
    @InjectRedis() private readonly redis: Redis,
  ) {}

  async create(
    pollId: number,
    questionId: number,
    createAnswerDto: CreateAnswerDto,
  ): Promise<Answer | null> {
    const answer = this.answerRepository.create(createAnswerDto);

    const question = await this.questionService.findOne(pollId, questionId);
    if (!question) return;

    answer.question = question;

    return await this.answerRepository.save(answer);
  }

  async findAll(pollId: number, questionId: number): Promise<Answer[] | null> {
    const question = await this.questionService.findOne(pollId, questionId);
    if (!question) return;

    return question.answers;
  }

  async findOne(
    pollId: number,
    questionId: number,
    answerId: number,
  ): Promise<Answer | null> {
    const question = await this.questionService.findOne(pollId, questionId);
    if (!question) return;

    return await this.answerRepository.findOne({
      where: { question, id: answerId },
    });
  }

  async increaseCount(questionId: number, answerId: number): Promise<boolean> {
    const result = await this.answerRepository.increment(
      { id: answerId },
      'count',
      1,
    );

    if (result.affected == 0) {
      return false;
    }

    this.redis.publish('vote', questionId.toString());
    return true;
  }

  // async update(
  //   pollId: number,
  //   questionId: number,
  //   answerId: number,
  //   updateAnswerDto: UpdateAnswerDto,
  // ): Promise<Answer | null> {
  //   const answer = await this.findOne(pollId, questionId, answerId);
  //   if (!answer) return;

  //   this.answerRepository.merge(answer, updateAnswerDto);
  //   return this.answerRepository.save(answer);
  // }

  // async remove(
  //   pollId: number,
  //   questionId: number,
  //   answerId: number,
  // ): Promise<Answer | null> {
  //   const answer = await this.findOne(pollId, questionId, answerId);
  //   if (!answer) return;

  //   await this.answerRepository.delete(answer);
  //   return answer;
  // }
}
