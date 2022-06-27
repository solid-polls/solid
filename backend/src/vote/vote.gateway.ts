import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

export type VoteServer = Server<ClientToServerEvents, ServerToClientEvents>;

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: VoteServer;

  notifyListeners() {
    this.server.emit('update');
  }
}
