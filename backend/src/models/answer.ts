import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import Question from './question';

@Entity('answers')
export default class Answer {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  text: string;

  @ApiProperty()
  @Column()
  count: number;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
