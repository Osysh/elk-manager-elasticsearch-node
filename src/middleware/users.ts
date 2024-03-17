import { Request, Response, NextFunction } from "express";
import { UserService } from "../service";

declare module "express" {
  interface Request {
    users?: UserService;
  }
}

export const users_middleware = (
  request: Request,
  response: Response,
  next: NextFunction,
  users: UserService
) => {
  request.users = users;

  next();
};
