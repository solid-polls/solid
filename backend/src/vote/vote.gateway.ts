import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

interface ServerToClientEvents {
  update: () => void;
}

export type VoteServer = Server<Record<string, never>, ServerToClientEvents>;

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: VoteServer;

  notifyListeners() {
    this.server.emit('update');
  }
}
