import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface VotePayload {
  pollCode: number;
  questionID: number;
  answerID: number;
}

interface UpdatePayload {
  questions: [{ id: number; votes: number }];
}

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: Server;
  private votes = 0;

  @SubscribeMessage('vote')
  handleMessage(client: any, payload: VotePayload): void {
    this.votes++;
    this.server.emit('update', { votes: this.votes });
  }
}
