import { Server, Socket } from 'socket.io';
import { Server as HttpServer } from 'http';
import { serverEmitter } from '@/server/server-emitter';

export class WebSockets extends Server {
  private static io: WebSockets;

  constructor(httpServer: HttpServer) {
    super(httpServer, {
      cors: { origin: '*', methods: '*' },
      pingInterval: 10000,
      pingTimeout: 5000,
      cookie: false,
      serveClient: false,
      maxHttpBufferSize: 1e8,
    });

    this.runListeners();
  }

  private runListeners() {
    serverEmitter.on('cron-valuta-kg-exchange', (data) => {
      this.of('/subscription').emit('valuta-kg-exchange', data);
    });
    serverEmitter.on('cron-akchabar-kg-exchange', (data) => {
      this.of('/subscription').emit('akchabar-kg-exchange', data);
    });
  }

  public static getInstance(httpServer: HttpServer): WebSockets {
    WebSockets;
    if (!WebSockets.io) {
      WebSockets.io = new WebSockets(httpServer);
    }

    return WebSockets.io;
  }

  public initializeHandlers(socketHandlers: Array<any>) {
    socketHandlers.forEach((element) => {
      let namespace = WebSockets.io.of(element.path, (socket: Socket) => {
        element.handler.handleConnection(socket);
      });

      if (element.handler.middlewareImplementation) {
        namespace.use(element.handler.middlewareImplementation);
      }
    });
  }
}
