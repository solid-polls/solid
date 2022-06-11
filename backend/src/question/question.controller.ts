import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import Question from '../models/question';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { QuestionService } from './question.service';
import { Response } from 'express';

@ApiTags('questions')
@Controller('questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiCreatedResponse({
    type: Question,
    description: 'The question has been created',
  })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return await this.questionService.create(createQuestionDto);
  }

  @Get(':questionId')
  @ApiOkResponse({
    type: Question,
    description: 'Returns the question with this id',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No question with this id has been found',
  })
  async findOne(
    @Param('questionId') questionId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const question = await this.questionService.findOne(questionId);
    if (!question) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return question;
  }

  @Patch(':questionId')
  @ApiOkResponse({
    type: Question,
    description: 'Updates the question with this id and returns it',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No question with this id has been found',
  })
  async update(
    @Param('questionId') questionId: number,
    @Body() updateQuestionDto: UpdateQuestionDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const question = await this.questionService.update(
      questionId,
      updateQuestionDto,
    );
    if (!question) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return question;
  }

  @Delete(':questionId')
  @HttpCode(204)
  @ApiNoContentResponse({ description: 'The question has been deleted' })
  @ApiNotFoundResponse({ description: 'The question has not been found' })
  async remove(
    @Param('questionId') questionId: number,
    @Res({ passthrough: true }) res: Response,
  ) {
    const removed = await this.questionService.remove(questionId);
    if (!removed) {
      res.status(HttpStatus.NOT_FOUND);
    }
  }
}
