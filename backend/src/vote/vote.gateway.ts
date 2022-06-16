import {SubscribeMessage, WebSocketGateway, WebSocketServer} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';


@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: Server;
  private votes = 0;

  @SubscribeMessage('vote')
  handleMessage(client: any, payload: any): void {
    this.votes++;
    this.server.emit('update', { votes: this.votes });
  }
}
