import { Inject, Injectable } from '@nestjs/common';
import Question from '../models/question';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { PollService } from '../poll/poll.service';
import Answer from '../models/answer';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
    @Inject(PollService)
    private pollService: PollService,
  ) {}

  async create(
    pollId: number,
    createQuestionDto: CreateQuestionDto,
  ): Promise<Question | null> {
    const question = this.questionRepository.create(createQuestionDto);

    const poll = await this.pollService.findOne(pollId);
    if (!poll) return;

    question.poll = poll;

    return await this.questionRepository.save(question);
  }

  async findAll(pollId: number): Promise<Question[] | null> {
    const poll = await this.pollService.findOne(pollId);
    if (!poll) return;

    return poll.questions;
  }

  async findOne(pollId: number, questionId: number): Promise<Question | null> {
    const poll = await this.pollService.findOne(pollId);
    if (!poll) return;

    return this.questionRepository.findOne({ where: { poll, id: questionId } });
  }

  // async update(
  //   pollId: number,
  //   questionId: number,
  //   updateQuestionDto: UpdateQuestionDto,
  // ): Promise<Question | null> {
  //   const question = await this.findOne(pollId, questionId);
  //   if (!question) return;

  //   this.questionRepository.merge(question, updateQuestionDto);
  //   return await this.questionRepository.save(question);
  // }

  // async remove(pollId: number, questionId: number): Promise<Question | null> {
  //   const question = await this.findOne(pollId, questionId);
  //   if (!question) return;

  //   await this.questionRepository.delete(question);
  //   return question;
  // }
}
