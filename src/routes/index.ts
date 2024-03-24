import express from "express";

import { router as configRouter } from "./config";
import { router as actionRouter } from "./actions";
import { router as userRouter } from "./users";
import { router as statusRouter } from "./status";

const apiRouter = express.Router();

apiRouter.use(configRouter);
apiRouter.use(statusRouter);
apiRouter.use(actionRouter);
apiRouter.use(userRouter);

export { apiRouter };
