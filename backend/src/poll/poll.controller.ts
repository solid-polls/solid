import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import Poll from 'src/models/poll';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { PollService } from './poll.service';

@Controller('polls')
export class PollController {
  constructor(private readonly pollService: PollService) {}

  @Post()
  async create(@Body() createPollDto: CreatePollDto): Promise<Poll> {
    return await this.pollService.create(createPollDto);
  }

  @Get()
  async findAll(): Promise<Poll[]> {
    return await this.pollService.findAll();
  }

  @Get(':pollId')
  async findOne(@Param('pollId') pollId: number): Promise<Poll | null> {
    return await this.pollService.findOne(pollId);
  }

  @Get('byCode/:code')
  async findByCode(@Param('code') code: string): Promise<Poll | null> {
    return await this.pollService.findOneByCode(code);
  }

  @Patch(':pollId')
  update(
    @Param('pollId') pollId: number,
    @Body() updatePollDto: UpdatePollDto,
  ) {
    return this.pollService.update(pollId, updatePollDto);
  }

  @Delete(':pollId')
  remove(@Param('pollId') pollId: number) {
    return this.pollService.remove(pollId);
  }
}
