import { Request, Response } from "express";
import { MODULE_NAME } from "../utils/status";

const getStatus = (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  const user = req.users?.getUser(userId);

  res.send({ userId, module: MODULE_NAME, status: user?.engine.status });
};

export { getStatus };
