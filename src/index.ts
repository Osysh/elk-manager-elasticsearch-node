import express from "express";
import cors from "cors";
import http from "http";
import { WebsocketService } from "./service";
import { UserService } from "./service/user";
import { users_middleware, websocket_middleware } from "./middleware";
import { apiRouter } from "./routes";
import { logger } from "./utils/logger";

const SERVER_PORT: number = parseInt(process.env.SERVER_PORT || "3010", 10);
const SERVER_HOST: string = process.env.SERVER_HOST || "localhost";
const MAX_CONNECTION: number = parseInt(process.env.MAX_CONNECTION || "5");

const app = express();
const httpServer = http.createServer(app);

// Middlewares
app.use(express.json());
app.use(cors({ origin: "*" }));
app.use((req, res, next) => users_middleware(req, res, next, users));
app.use((req, res, next) => websocket_middleware(req, res, next, socket));

// Routes
app.use("/api", apiRouter);

// Services
const users = new UserService();
const socket = new WebsocketService(httpServer, users, MAX_CONNECTION);

httpServer.listen(SERVER_PORT, () => {
  logger.info(`Server is running on http://${SERVER_HOST}:${SERVER_PORT}`);
});
