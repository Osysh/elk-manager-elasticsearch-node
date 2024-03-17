import WebSocket from "ws";
import http from "http";
import { EngineService } from "./engine";
import { ConfigService } from "./config";
import { UserService } from "./user";

export class WebsocketService {
  private socket: WebSocket.Server;

  constructor(
    server: http.Server,
    private users: UserService,
    private maxConnection: number
  ) {
    this.socket = new WebSocket.Server({ server });

    this.socket.on("connection", (ws: WebSocket) => {
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
      } else {
        ws.close();
      }
    });
  }
}
