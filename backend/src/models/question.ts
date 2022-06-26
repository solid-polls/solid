import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Answer from './answer';
import Poll from './poll';

@Entity('questions')
export default class Question {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty({ type: [Answer] })
  @OneToMany(() => Answer, (answer) => answer.question, {
    eager: true,
    cascade: ['insert'],
  })
  answers: Answer[];

  @ManyToOne(() => Poll, (poll) => poll.questions)
  poll: Poll;
}
