import { MODULE_NAME, STATUS, TYPES } from "../utils/status";
import {
  MAX_START_LOADING_TIME,
  MAX_STOP_LOADING_TIME,
  MIN_START_LOADING_TIME,
  MIN_STOP_LOADING_TIME,
  ON_DISPATCHER_TIME,
} from "../utils/const";
import { Socket } from "socket.io";

export class EngineService {
  private timer: NodeJS.Timeout | undefined;
  public status: string = STATUS.OFF;

  constructor(private ws: Socket) {}

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
        console.log("Engine is running...")
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
    console.log("Stopping the engine...");

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
