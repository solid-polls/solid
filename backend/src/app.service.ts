import { Injectable } from '@nestjs/common';
import { Connection } from 'typeorm';
import Poll from './models/poll';

@Injectable()
export class AppService {

  constructor(private connection: Connection) {}

  getPoll(code: number): Promise<Poll | null> {
    return this.connection.transaction(async manager => {
      return manager.findOne(Poll, {code});
    });
  }
}
