import http from "http";
import socketIo, { Server, Socket } from "socket.io";
import { EngineService } from "./engine";
import { ConfigService } from "./config";
import { UserService } from "./user";
import { MODULE_NAME, TYPES } from "../utils/status";

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

        console.log(`${userId} connected to server`);

        ws.on("close", () => {
          const userId = this.users.deleteUser(ws);

          console.log(`${userId} disconnected from the server`);
        });

        ws.emit(
          "message",
          JSON.stringify({ type: TYPES.CONNECTED, module: MODULE_NAME, userId })
        );
      } else {
        ws.disconnect();
      }
    });
  }
}
