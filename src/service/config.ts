import { Config } from "../types";

export class ConfigService {
  private jvmSize: number = 0;
  private password: string = "";
  private port: number = 3000;

  constructor() {
    this.init();
  }

  init() {
    this.jvmSize = 1;
    this.password = "my_password";
    this.port = 9500;
  }

  public get() {
    return {
      jvmSize: this.jvmSize,
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
