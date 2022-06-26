import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import Question from './question';

@Entity('polls')
export default class Poll {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  title: string;

  @ApiProperty()
  @Column()
  code: string;

  @ApiProperty({ type: [Question] })
  @OneToMany(() => Question, (question) => question.poll, {
    eager: true,
    cascade: ['insert'],
  })
  questions: Question[];
}
