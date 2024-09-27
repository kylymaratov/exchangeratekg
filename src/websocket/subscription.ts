import { Socket } from 'socket.io';
import AkchabarKgService from '@/services/akchabar-service';
import ValutaKgService from '@/services/valutakg-service';
import { DefaultEventsMap } from 'socket.io/dist/typed-events';

interface TSocket {
  handleConnection(socket: Socket): void;
  middlewareImplementation?(socket: Socket, next: any): void;
}

export class SubscriptionSocket implements TSocket {
  private valutaKgService: ValutaKgService = new ValutaKgService();
  private akchabarKgService: AkchabarKgService = new AkchabarKgService();

  async handleConnection(
    socket: Socket<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap, any>,
  ) {
    const valutaKgCourses = await this.valutaKgService.getExchange();
    const akchabarkgCourses = await this.akchabarKgService.getExchange();

    socket.emit('valuta-kg-exchange', valutaKgCourses);
    socket.emit('akchabar-kg-exchange', akchabarkgCourses);
  }

  middlewareImplementation(socket: Socket, next: any): void {
    next();
  }
}
