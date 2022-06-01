import { Controller, Get, NotFoundException, Query } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse } from '@nestjs/swagger';
import { AppService } from './app.service';
import Poll from './models/poll';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('poll')
  @ApiOkResponse({ type: Poll })
  @ApiNotFoundResponse()
  async getPoll(@Query('code') code: number): Promise<Poll> {
    const poll = await this.appService.getPoll(code);
    if (!poll) {
      throw new NotFoundException();
    }
    return poll;
  }
}
