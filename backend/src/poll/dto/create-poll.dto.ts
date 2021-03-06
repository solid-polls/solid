import { ApiProperty } from '@nestjs/swagger';
import { CreateQuestionDto } from '../../question/dto/create-question.dto';

export class CreatePollDto {
  @ApiProperty()
  title: string;

  @ApiProperty({ type: [CreateQuestionDto] })
  questions: CreateQuestionDto[];
}
