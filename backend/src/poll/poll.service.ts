import { Injectable } from '@nestjs/common';
import Poll from '../models/poll';
import { Connection } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';

@Injectable()
export class PollService {
  constructor(private connection: Connection) {}

  create(createPollDto: CreatePollDto): Promise<Poll> {
    return this.connection.transaction(async (manager) => {
      const poll = manager.create(Poll, createPollDto);
      poll.code = Math.random().toString(10).slice(2, 5);
      return await manager.save(poll);
    });
  }

  findAll(): Promise<Poll[]> {
    return this.connection.transaction(async (manager) => {
      return manager.find(Poll);
    });
  }

  findOne(pollId: number): Promise<Poll | null> {
    return this.connection.transaction(async (manager) => {
      return manager.findOne(Poll, { where: { id: pollId } });
    });
  }

  findOneByCode(code: string): Promise<Poll | null> {
    return this.connection.transaction(async (manager) => {
      const polls = await manager.find(Poll, { where: { code } });
      if (polls.length == 0) {
        return null;
      }

      return polls[0];
    });
  }

  update(pollId: number, updatePollDto: UpdatePollDto): Promise<Poll | null> {
    return this.connection.transaction(async (manager) => {
      const poll = await manager.findOne(Poll, { where: { id: pollId } });
      manager.merge(Poll, poll, updatePollDto);
      return await manager.save(poll);
    });
  }

  remove(pollId: number): void {
    this.connection.transaction(async (manager) => {
      await manager.delete(Poll, { id: pollId });
    });
  }
}
