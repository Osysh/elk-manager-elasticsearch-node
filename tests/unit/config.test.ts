import { Config } from "../../src/types";
import { ConfigService } from "../../src/service";

describe("ConfigService", () => {
  let configService: ConfigService;

  beforeEach(() => {
    configService = new ConfigService();
  });

  test("Initialization sets default values", () => {
    expect(configService["jvm_size"]).toBe(1);
    expect(configService["password"]).toBe("my_password");
    expect(configService["port"]).toBe(9500);
  });

  test("Get method returns the current configuration", () => {
    const config = configService.get();
    expect(config).toEqual({
      jvm_size: 1,
      password: "my_password",
      port: 9500,
    });
  });

  test("Update method updates configuration properties", () => {
    const newConfig: Config = {
      jvm_size: 2,
      password: "new_password",
      port: 8080,
    };
    configService.update(newConfig);
    expect(configService.get()).toEqual(newConfig);
  });

  test("Update method throws an error for invalid configuration item", () => {
    const newConfig: Config = {
      // @ts-ignore
      invalidKey: "value",
    };
    expect(() => {
      configService.update(newConfig);
    }).toThrow("Invalid configuration item: invalidKey");
  });

  test("Update method maintains existing properties for partial updates", () => {
    const newConfig: Partial<Config> = {
      jvm_size: 3,
    };
    configService.update(newConfig);
    expect(configService.get()).toEqual({
      jvm_size: 3,
      password: "my_password",
      port: 9500,
    });
  });
});
