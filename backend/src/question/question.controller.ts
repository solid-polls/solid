import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
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
@Controller('polls/:pollId/questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiCreatedResponse({
    type: Question,
    description: 'Creates the question and returns it',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll with this id has been found',
  })
  async create(
    @Param('pollId') pollId: number,
    @Body() createQuestionDto: CreateQuestionDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Question | null> {
    const question = await this.questionService.create(
      pollId,
      createQuestionDto,
    );
    if (!question) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return question;
  }

  @Get()
  @ApiOkResponse({
    type: [Question],
    description: 'Returns all questions of this poll',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll with this id has been found',
  })
  async findAll(
    @Param('pollId') pollId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Question[] | null> {
    const polls = await this.questionService.findAll(pollId);
    if (!polls) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return polls;
  }

  @Get(':questionId')
  @ApiOkResponse({
    type: Question,
    description: 'Returns the question with this id',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll or question with the given id has been found',
  })
  async findOne(
    @Param('pollId') pollId: number,
    @Param('questionId') questionId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Question | null> {
    const question = await this.questionService.findOne(pollId, questionId);
    if (!question) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return question;
  }

  // @Patch(':questionId')
  // @ApiOkResponse({
  //   type: Question,
  //   description: 'Updates the question with this id and returns it',
  // })
  // @ApiNotFoundResponse({
  //   type: null,
  //   description: 'No poll ot question with the given id has been found',
  // })
  // async update(
  //   @Param('pollId') pollId: number,
  //   @Param('questionId') questionId: number,
  //   @Body() updateQuestionDto: UpdateQuestionDto,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Question | null> {
  //   const question = await this.questionService.update(
  //     pollId,
  //     questionId,
  //     updateQuestionDto,
  //   );
  //   if (!question) {
  //     res.status(HttpStatus.NOT_FOUND);
  //     return;
  //   }

  //   return question;
  // }

  // @Delete(':questionId')
  // @ApiOkResponse({ description: 'Deletes the question and returns it' })
  // @ApiNotFoundResponse({
  //   description: 'The poll or question with this id has been found',
  // })
  // async remove(
  //   @Param('pollId') pollId: number,
  //   @Param('questionId') questionId: number,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Question | null> {
  //   const question = await this.questionService.remove(pollId, questionId);
  //   if (!question) {
  //     res.status(HttpStatus.NOT_FOUND);
  //     return;
  //   }

  //   return question;
  // }
}
