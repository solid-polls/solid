import { Injectable } from '@nestjs/common';
import Poll from '../models/poll';
import { Repository } from 'typeorm';
import { CreatePollDto } from './dto/create-poll.dto';
import { UpdatePollDto } from './dto/update-poll.dto';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PollService {
  constructor(
    @InjectRepository(Poll)
    private pollRepository: Repository<Poll>,
  ) {}

  async create(createPollDto: CreatePollDto): Promise<Poll> {
    const poll = this.pollRepository.create(createPollDto);
    do {
      poll.code = Math.random().toString(10).slice(2, 7);
    } while (await this.pollRepository.findOne({ where: { code: poll.code } }));
    return await this.pollRepository.save(poll);
  }

  findAll(): Promise<Poll[]> {
    return this.pollRepository.find();
  }

  findOne(pollId: number): Promise<Poll | null> {
    return this.pollRepository.findOne({ where: { id: pollId } });
  }

  async findOneByCode(code: string): Promise<Poll | null> {
    const polls = await this.pollRepository.find({ where: { code } });
    if (polls.length == 0) {
      return null;
    }

    return polls[0];
  }

  async update(
    pollId: number,
    updatePollDto: UpdatePollDto,
  ): Promise<Poll | null> {
    const poll = await this.pollRepository.findOne({ where: { id: pollId } });
    this.pollRepository.merge(poll, updatePollDto);
    return await this.pollRepository.save(poll);
  }

  async remove(pollId: number): Promise<boolean> {
    const poll = await this.pollRepository.findOne({ id: pollId });
    await this.pollRepository.delete(poll);
    return poll !== undefined;
  }
}
