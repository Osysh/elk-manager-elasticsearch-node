import { Request, Response } from "express";
import { Action } from "../types";

const handle_actions = (req: Request, res: Response) => {
  const userId = req.query.userId as string;
  const body = req.body as { action: Action };

  const action = body.action as Action;
  const user = req.users?.getUser(userId);

  switch (action) {
    case "start": {
      if (user?.engine.status === "on" || user?.engine.status === "loading") {
        res.status(400).send("Engine already started");
        return;
      } else {
        user?.engine.start();
        res.send("Engine started!");
      }
      break;
    }
    case "stop": {
      if (user?.engine.status === "off") {
        res.status(400).send("Engine is off");
        return;
      } else {
        user?.engine.stop();
        res.send("Engine stopped!");
      }
      break;
    }
  }

  return;
};

export { handle_actions };
