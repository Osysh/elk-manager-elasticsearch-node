export type Action = "start" | "stop";

export interface User {
  id?: string;
  ws: WebSocket;
  engine: EngineService;
  config: ConfigService;
}

export interface Config {
  jvmSize: number;
  password: string;
  port: number;
}
