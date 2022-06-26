import { Module } from '@nestjs/common';
import { VoteGateway } from './vote.gateway';

@Module({
  providers: [VoteGateway],
  exports: [VoteGateway],
})
export class VoteModule {}
