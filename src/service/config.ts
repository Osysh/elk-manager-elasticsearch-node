import { Config } from "../types";
import { JVM_SIZE, PASSWORD, PORT } from "../utils/const";

export class ConfigService {
  private jvm_size: number = 0;
  private password: string = "";
  private port: number = 3000;

  constructor() {
    this.init();
  }

  init() {
    this.jvm_size = JVM_SIZE;
    this.password = PASSWORD;
    this.port = PORT;
  }

  public get() {
    return {
      jvm_size: this.jvm_size,
      password: this.password,
      port: this.port,
    };
  }

  public update(newConfig: Partial<Config>) {
    for (const key in newConfig) {
      if (newConfig.hasOwnProperty(key)) {
        if (this.hasOwnProperty(key)) {
          // @ts-ignore
          this[key] = newConfig[key];
        } else {
          throw new Error(`Invalid configuration item: ${key}`);
        }
      }
    }

    return this.get();
  }
}
