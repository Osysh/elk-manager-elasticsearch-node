import { Request, Response } from "express";

const getStatus = (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  const user = req.users?.getUser(userId);

  res.send(user?.engine.status);
}

export { getStatus };
