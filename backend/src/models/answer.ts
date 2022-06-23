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

  // eslint-disable-next-line @typescript-eslint/no-inferrable-types
  @ApiProperty()
  @Column()
  count: number = 0;

  @ManyToOne(() => Question, (question) => question.answers)
  question: Question;
}
