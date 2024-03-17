import { Request, Response } from "express";
import { Config } from "../types";

const get = (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  const user = req.users?.getUser(userId);

  if (!user) {
    res.status(404).send("User not found");
  }

  res.send(user?.config.get());
};

const update = (req: Request, res: Response) => {
  const userId = req.query.userId as string;

  const config = req.body as Config;

  const user = req.users?.getUser(userId);

  if (!user) {
    res.status(404).send("User not found");
  }

  if (!config) {
    res.status(400).send("Invalid config value");
  }

  user?.config.update(config);

  res.send(user?.config.get());
};

export { get, update };
