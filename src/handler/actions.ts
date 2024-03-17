import { Request, Response } from "express";
import { Action } from "../types";

const handle_actions = (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const action = req.body.action as Action;

  const user = req.users?.getUser(userId);

  switch (action) {
    case "start": {
      user?.engine.start();
      res.send("Engine started!");
      break;
    }
    case "stop": {
      user?.engine.stop();
      res.send("Engine stopped!");
      break;
    }
  }
}

export { handle_actions };
