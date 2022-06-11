import { Injectable } from '@nestjs/common';
import Question from '../models/question';
import { Repository } from 'typeorm';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class QuestionService {
  constructor(
    @InjectRepository(Question)
    private questionRepository: Repository<Question>,
  ) {}

  async create(createQuestionDto: CreateQuestionDto) {
    const question = this.questionRepository.create(createQuestionDto);
    return await this.questionRepository.save(question);
  }

  findOne(id: number) {
    return this.questionRepository.findOne({ where: { id } });
  }

  async update(id: number, updateQuestionDto: UpdateQuestionDto) {
    const poll = await this.questionRepository.findOne({ where: { id } });
    this.questionRepository.merge(poll, updateQuestionDto);
    return await this.questionRepository.save(poll);
  }

  async remove(id: number) {
    const question = await this.questionRepository.findOne({ id });
    await this.questionRepository.delete(question);
    return question !== undefined;
  }
}
