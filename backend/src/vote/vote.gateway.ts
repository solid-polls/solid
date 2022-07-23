import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { InjectRedis, Redis } from '@nestjs-modules/ioredis';
import { Server, Socket } from 'socket.io';

export type VoteServer = Server<ClientToServerEvents, ServerToClientEvents>;

@WebSocketGateway()
export class VoteGateway {
  @WebSocketServer() server: VoteServer;
  subscriber: Redis;

  constructor(@InjectRedis() private readonly redis: Redis) {
    this.subscriber = this.redis.duplicate();
    this.subscriber.subscribe('vote');
    this.subscriber.on('message', (channel, message) => {
      this.notifyListeners(message);
    });
  }

  @SubscribeMessage('subscribeToQuestion')
  handleEvent(
    @MessageBody() questionId: string,
    @ConnectedSocket()
    client: Socket<ClientToServerEvents, ServerToClientEvents>,
  ) {
    client.join(questionId);
  }

  notifyListeners(questionId: string) {
    this.server.to(questionId).emit('update');
  }
}
