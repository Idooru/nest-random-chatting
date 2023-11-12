import { Socket } from 'socket.io';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
} from '@nestjs/websockets';
import { Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Chatting } from './models/chattings.model';
import { Model } from 'mongoose';
import { Socket as SocketModel } from './models/sockets.model';

@WebSocketGateway({ namespace: '/chattings' })
export class ChatsGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  private logger = new Logger('chat');

  constructor(
    @InjectModel(Chatting.name) private readonly chattingModel: Model<Chatting>,
    @InjectModel(SocketModel.name)
    private readonly socketModel: Model<SocketModel>,
  ) {}

  afterInit(): any {
    this.logger.log('init');
  }

  handleConnection(@ConnectedSocket() socket: Socket): any {
    // this.logger.log(`connect: ${socket.id} ${socket.nsp.name}`);
  }

  async handleDisconnect(@ConnectedSocket() socket: Socket): Promise<void> {
    // this.logger.log(`disconnect: ${socket.id} ${socket.nsp.name}`);
    const user = await this.socketModel.findOne({ id: socket.id });

    if (user) {
      socket.broadcast.emit('disconnect_user', user.username);
      await user.deleteOne();
      this.logger.log(`${user.username} is exit`);
    }
  }

  @SubscribeMessage('new_user')
  async handleNewUser(
    @MessageBody() username: string,
    @ConnectedSocket() socket: Socket,
  ): Promise<string> {
    this.logger.log(`${username} is entered`);
    const exist = await this.socketModel.exists({ username });

    if (exist) {
      username = `${username}_${Math.floor(Math.random() * 100)}`;
    }

    await this.socketModel.create({
      id: socket.id,
      username,
    });

    socket.broadcast.emit('user_connected', username);

    return username;
  }

  @SubscribeMessage('submit_chat')
  async handleSubmitChat(
    @MessageBody() chat: string,
    @ConnectedSocket() socket: Socket,
  ): Promise<void> {
    const socketObj = await this.socketModel.findOne({ id: socket.id });

    await this.chattingModel.create({
      user: socketObj,
      chat,
    });

    socket.broadcast.emit('new_chat', {
      chat,
      username: socketObj.username,
    });
  }
}
