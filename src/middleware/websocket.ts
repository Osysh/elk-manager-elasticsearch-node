import { Request, Response, NextFunction } from "express";
import { WebsocketService } from "../service";

declare module "express" {
  interface Request {
    websocket?: WebsocketService;
  }
}

export const websocket_middleware = (
  request: Request,
  response: Response,
  next: NextFunction,
  websocket: WebsocketService
) => {
  request.websocket = websocket;

  next();
};
