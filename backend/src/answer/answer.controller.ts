import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Res,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import Answer from '../models/answer';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { Response } from 'express';

@ApiTags('answers')
@Controller('polls/:pollId/questions/:questionId/answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  sanitized(answer: Answer): Answer {
    delete answer.question;
    return answer;
  }

  @Post()
  @ApiCreatedResponse({
    type: Answer,
    description: 'Creates the answer and returns it',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll or question with the given id has been found',
  })
  async create(
    @Param('pollId') pollId: number,
    @Param('questionId') questionId: number,
    @Body() createAnswerDto: CreateAnswerDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Answer | null> {
    const answer = await this.answerService.create(
      pollId,
      questionId,
      createAnswerDto,
    );
    if (!answer) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return this.sanitized(answer);
  }

  @Get()
  @ApiOkResponse({
    type: [Answer],
    description: 'Returns all answers of this poll',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll or question with the given id has been found',
  })
  async findAll(
    @Param('pollId') pollId: number,
    @Param('questionId') questionId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Answer[] | null> {
    const answers = await this.answerService.findAll(pollId, questionId);
    if (!answers) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return answers.map((answer) => this.sanitized(answer));
  }

  @Get(':answerId')
  @ApiOkResponse({
    type: [Answer],
    description: 'Returns the answers with this id',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll, question or answer with the given id has been found',
  })
  async findOne(
    @Param('pollId') pollId: number,
    @Param('questionId') questionId: number,
    @Param('answerId') answerId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Answer | null> {
    const answer = await this.answerService.findOne(
      pollId,
      questionId,
      answerId,
    );
    if (!answer) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return this.sanitized(answer);
  }

  @Post(':answerId/vote')
  @ApiNoContentResponse({
    description: 'Vote recorded successfully',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No answer with the given id has been found',
  })
  async vote(
    @Param('pollId') pollId: number,
    @Param('questionId') questionId: number,
    @Param('answerId') answerId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<null> {
    const result = await this.answerService.increaseCount(questionId, answerId);
    if (!result) {
      res.status(404);
      return;
    }
    res.status(204);
  }

  // @Patch(':answerId')
  // @ApiOkResponse({
  //   type: [Answer],
  //   description: 'Updates the answer with this id and returns it',
  // })
  // @ApiNotFoundResponse({
  //   type: null,
  //   description: 'No poll, question or answer with the given id has been found',
  // })
  // async update(
  //   @Param('pollId') pollId: number,
  //   @Param('questionId') questionId: number,
  //   @Param('answerId') answerId: number,
  //   @Body() updateAnswerDto: UpdateAnswerDto,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Answer | null> {
  //   const answer = await this.answerService.update(
  //     pollId,
  //     questionId,
  //     answerId,
  //     updateAnswerDto,
  //   );
  //   if (!answer) {
  //     res.status(HttpStatus.NOT_FOUND);
  //     return;
  //   }

  //   return answer;
  // }

  // @Delete(':answerId')
  // @ApiOkResponse({ description: 'Deletes the answer and returns it' })
  // @ApiNotFoundResponse({
  //   description: 'No poll, question or answer with the given id has been found',
  // })
  // async remove(
  //   @Param('pollId') pollId: number,
  //   @Param('questionId') questionId: number,
  //   @Param('answerId') answerId: number,
  //   @Res({ passthrough: true }) res: Response,
  // ): Promise<Answer | null> {
  //   const answer = await this.answerService.remove(
  //     pollId,
  //     questionId,
  //     answerId,
  //   );
  //   if (!answer) {
  //     res.status(HttpStatus.NOT_FOUND);
  //     return;
  //   }

  //   return answer;
  // }
}
