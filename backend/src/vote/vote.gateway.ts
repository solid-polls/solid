import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Server } from 'socket.io';

export type VoteServer = Server<ClientToServerEvents, ServerToClientEvents>;

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: VoteServer;
  subscriber: Redis;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.subscriber = this.redis.duplicate();
    this.subscriber.subscribe('vote');
    this.subscriber.on('message', () => {
      this.notifyListeners();
    });
  }

  notifyListeners() {
    this.server.emit('update');
  }
}
