import WebSocket from "ws";

const MIN_START_LOADING_TIME = 4000;
const MAX_START_LOADING_TIME = 10000;

const MIN_STOP_LOADING_TIME = 1000;
const MAX_STOP_LOADING_TIME = 2000;

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
    this.ws.send("loading");

    const loadingTime = this.randomEngineTimeLoader(
      MIN_START_LOADING_TIME,
      MAX_START_LOADING_TIME
    );

    setTimeout(() => {
      this.timer = setInterval(() => {
        this.ws.send("on");
      }, 1000);
    }, loadingTime);
  }

  private stopEngine() {
    console.log("Stoppong the engine...");
    this.ws.send("loading");

    const loadingTime = this.randomEngineTimeLoader(
      MIN_STOP_LOADING_TIME,
      MAX_STOP_LOADING_TIME
    );

    setTimeout(() => {
      clearInterval(this.timer);
      this.ws.send("off");
    }, loadingTime);
  }

  private randomEngineTimeLoader(min: number, max: number) {
    return Math.round(Math.random() * (max - min) + min);
  }
}
