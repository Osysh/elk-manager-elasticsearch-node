import { MODULE_NAME, STATUS, TYPES } from "../utils/status";
import {
  MAX_START_LOADING_TIME,
  MAX_STOP_LOADING_TIME,
  MIN_START_LOADING_TIME,
  MIN_STOP_LOADING_TIME,
  ON_DISPATCHER_TIME,
} from "../utils/const";
import { Socket } from "socket.io";
import { logger } from "../utils/logger";

export class EngineService {
  private timer: NodeJS.Timeout | undefined;
  public status: string = STATUS.OFF;
  public userId: string | undefined;

  constructor(private ws: Socket) {}

  public start() {
    logger.info(`${this.userId} starting the engine...`);
    this.initEngine();
  }

  public stop() {
    logger.info(`${this.userId} stopping the engine...`);
    this.stopEngine();
  }

  private initEngine() {
    this.ws.emit(
      "message",
      JSON.stringify({
        type: TYPES.ENGINE,
        module: MODULE_NAME,
        status: STATUS.LOADING,
      })
    );
    this.status = STATUS.LOADING;

    const loadingTime = this.randomEngineTimeLoader(
      MIN_START_LOADING_TIME,
      MAX_START_LOADING_TIME
    );

    setTimeout(() => {
      this.timer = setInterval(() => {
        this.ws.emit(
          "message",
          JSON.stringify({
            type: TYPES.ENGINE,
            module: MODULE_NAME,
            status: STATUS.ON,
          })
        );
        this.status = STATUS.ON;
      }, ON_DISPATCHER_TIME);
    }, loadingTime);
  }

  private stopEngine() {
    clearInterval(this.timer);

    this.ws.emit(
      "message",
      JSON.stringify({
        type: TYPES.ENGINE,
        module: MODULE_NAME,
        status: STATUS.LOADING,
      })
    );
    this.status = STATUS.LOADING;

    const loadingTime = this.randomEngineTimeLoader(
      MIN_STOP_LOADING_TIME,
      MAX_STOP_LOADING_TIME
    );

    setTimeout(() => {
      this.ws.emit(
        "message",
        JSON.stringify({
          type: TYPES.ENGINE,
          module: MODULE_NAME,
          status: STATUS.OFF,
        })
      );
      this.status = STATUS.OFF;
    }, loadingTime);
  }

  private randomEngineTimeLoader(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
