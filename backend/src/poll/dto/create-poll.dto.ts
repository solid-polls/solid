import { ApiProperty } from '@nestjs/swagger';

export class CreatePollDto {
  @ApiProperty()
  title: string;
}
