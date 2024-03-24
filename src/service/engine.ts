import WebSocket from "ws";
import { MODULE_NAME, STATUS, TYPES } from "../utils/status";
import {
  MAX_START_LOADING_TIME,
  MAX_STOP_LOADING_TIME,
  MIN_START_LOADING_TIME,
  MIN_STOP_LOADING_TIME,
  ON_DISPATCHER_TIME,
} from "../utils/const";

export class EngineService {
  private timer: NodeJS.Timeout | undefined;

  constructor(private ws: WebSocket) {}

  public start() {
    console.log("Starting the engine...");
    this.initEngine();
  }

  public stop() {
    console.log("Stopping the engine...");
    this.stopEngine();
  }

  private initEngine() {
    console.log("Initializing the engine...");
    this.ws.send(
      JSON.stringify({
        type: TYPES.ENGINE,
        module: MODULE_NAME,
        status: STATUS.LOADING,
      })
    );

    const loadingTime = this.randomEngineTimeLoader(
      MIN_START_LOADING_TIME,
      MAX_START_LOADING_TIME
    );

    setTimeout(() => {
      this.timer = setInterval(() => {
        this.ws.send(
          JSON.stringify({
            type: TYPES.ENGINE,
            module: MODULE_NAME,
            status: STATUS.ON,
          })
        );
      }, ON_DISPATCHER_TIME);
    }, loadingTime);
  }

  private stopEngine() {
    console.log("Stopping the engine...");
    this.ws.send(
      JSON.stringify({
        type: TYPES.ENGINE,
        module: MODULE_NAME,
        status: STATUS.LOADING,
      })
    );

    const loadingTime = this.randomEngineTimeLoader(
      MIN_STOP_LOADING_TIME,
      MAX_STOP_LOADING_TIME
    );

    setTimeout(() => {
      clearInterval(this.timer);
      this.ws.send(
        JSON.stringify({
          type: TYPES.ENGINE,
          module: MODULE_NAME,
          status: STATUS.OFF,
        })
      );
    }, loadingTime);
  }

  private randomEngineTimeLoader(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
