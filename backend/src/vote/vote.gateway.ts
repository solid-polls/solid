import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

interface UpdatePayload {
  votes: number;
}

interface ServerToClientEvents {
  update: (payload: UpdatePayload) => void;
}

interface VotePayload {
  pollCode: string;
  questionID: number;
  answerID: number;
}

interface ClientToServerEvents {
  vote: (payload: VotePayload) => void;
}

export type VoteServer = Server<ClientToServerEvents, ServerToClientEvents>;

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: VoteServer;
  private votes = 0;

  @SubscribeMessage('vote')
  handleMessage(client: any, payload: VotePayload): void {
    this.votes++;
    this.server.emit('update', { votes: this.votes });
  }
}
