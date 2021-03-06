import { ApiProperty } from '@nestjs/swagger';
import { CreateAnswerDto } from '../../answer/dto/create-answer.dto';

export class CreateQuestionDto {
  @ApiProperty()
  text: string;

  @ApiProperty({ type: [CreateAnswerDto] })
  answers: CreateAnswerDto[];
}
