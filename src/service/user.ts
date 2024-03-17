import { WebSocket } from "ws";
import { User } from "../types";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  private users: User[] = [];

  constructor() {}

  public getUsers(): User[] {
    return this.users;
  }

  public addUser(user: User): string {
    const userId = uuidv4();
    
    this.users.push({
      id: userId,
      ...user,
    });

    return userId;
  }

  public deleteUser(ws: WebSocket): string {
    const user = this.users.find((user) => user.ws === ws);

    // Delete user from table
    this.users = this.users.filter((user) => user.id !== user.id);

    return user?.id as string;
  }

  public getUser(userId: string): User {
    const user = this.users.find((user) => user.id === userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }
}
