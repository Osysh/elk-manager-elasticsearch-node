import { UserService } from "../../src/service/user";
import { EngineService } from "../../src/service/engine";
import { ConfigService } from "../../src/service/config";
import { WS as WebSocket } from "jest-websocket-mock";
import { User } from "../../src/types";

describe("UserService", () => {
  let userService: UserService;
  let client: WebSocket;

  beforeEach(() => {
    userService = new UserService();
    client = new WebSocket("ws://localhost:3020");
  });

  afterEach(() => {
    WebSocket.clean();
  });

  test("getUsers should return an empty array initially", () => {
    expect(userService.getUsers()).toEqual([]);
  });

  test("addUser should add a user to the users array", () => {
    const user: User = {
      config: new ConfigService(),
      engine: new EngineService(client as any),
      ws: client as any,
    };
    const userId = userService.addUser(user);

    expect(userService.getUsers()).toContainEqual({ id: userId, ...user });
  });

  test("deleteUser should delete a user from the users array", () => {
    const user: User = {
      config: new ConfigService(),
      engine: new EngineService(client as any),
      ws: client as any,
    };

    userService.deleteUser(user.ws as any);

    expect(userService.getUsers()).not.toContainEqual(user);
  });

  test("getUser should return the user with the specified ID", () => {
    const user: User = {
      config: new ConfigService(),
      engine: new EngineService(client as any),
      ws: client as any,
    };

    const userId = userService.addUser(user);

    expect(userService.getUser(userId)).toEqual({ id: userId, ...user });
  });

  test("getUser should throw an error if user with specified ID is not found", () => {
    expect(() => {
      userService.getUser("nonexistent-id");
    }).toThrow("User not found");
  });
});
