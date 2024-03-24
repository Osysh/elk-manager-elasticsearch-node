import http from "http";
import socketIo, { Server, Socket } from "socket.io";
import { EngineService } from "./engine";
import { ConfigService } from "./config";
import { UserService } from "./user";
import { MODULE_NAME, TYPES } from "../utils/status";
import { logger } from "../utils/logger";

export class WebsocketService {
  private socket: Server;

  constructor(
    server: http.Server,
    private users: UserService,
    private maxConnection: number
  ) {
    this.socket = new socketIo.Server(server, { cors: { origin: "*" } });

    this.socket.on("connection", (ws: Socket) => {
      if (this.users.getUsers().length < this.maxConnection) {
        const userId = this.users.addUser({
          engine: new EngineService(ws),
          config: new ConfigService(),
          ws,
        });

        this.users.getUser(userId).engine.userId = userId;

        logger.info(`${userId} connected to server`);

        ws.on("close", () => {
          const userId = this.users.deleteUser(ws);

          logger.info(`${userId} disconnected from the server`);
        });

        ws.emit(
          "message",
          JSON.stringify({ type: TYPES.CONNECTED, module: MODULE_NAME, userId })
        );
      } else {
        logger.warn(`Max connection reached, disconnecting ${ws.id}`);

        ws.disconnect();
      }
    });
  }
}
