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
import Poll from '../models/poll';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { PollService } from './poll.service';
import { Response } from 'express';

@ApiTags('polls')
@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  @ApiCreatedResponse({
    type: Poll,
    description: 'Creates the poll and returns it',
  })
  async create(@Body() createPollDto: CreatePollDto): Promise<Poll> {
    return await this.pollService.create(createPollDto);
  }

  @Get()
  @ApiOkResponse({
    type: [Poll],
    description: 'Returns all polls of the system',
  })
  async findAll(): Promise<Poll[]> {
    return await this.pollService.findAll();
  }

  @Get(':pollId')
  @ApiOkResponse({ type: Poll, description: 'Returns the poll with this id' })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll with this id has been found',
  })
  async findOne(
    @Param('pollId') pollId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Poll | void> {
    const poll = await this.pollService.findOne(pollId);
    if (!poll) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return poll;
  }

  @Get('byCode/:code')
  @ApiOkResponse({ type: Poll, description: 'Returns the poll with this code' })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll with this code has been found',
  })
  async findByCode(
    @Param('code') code: string,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Poll | void> {
    const poll = await this.pollService.findOneByCode(code);
    if (!poll) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return poll;
  }

  @Patch(':pollId')
  @ApiOkResponse({
    type: Poll,
    description: 'Updates the poll with this id and returns it',
  })
  @ApiNotFoundResponse({
    type: null,
    description: 'No poll with this id has been found',
  })
  async update(
    @Param('pollId') pollId: number,
    @Body() updatePollDto: UpdatePollDto,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Poll | void> {
    const poll = await this.pollService.update(pollId, updatePollDto);
    if (!poll) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return poll;
  }

  @Delete(':pollId')
  @ApiOkResponse({ description: 'Deletes the poll and returns it' })
  @ApiNotFoundResponse({ description: 'No poll with this id has been found' })
  async remove(
    @Param('pollId') pollId: number,
    @Res({ passthrough: true }) res: Response,
  ): Promise<Poll | null> {
    const poll = await this.pollService.remove(pollId);
    if (!poll) {
      res.status(HttpStatus.NOT_FOUND);
      return;
    }

    return poll;
  }
}
