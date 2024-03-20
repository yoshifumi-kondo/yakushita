import { type UserAuth, UserId } from "@/api/lib/domain";

const symbol = Symbol("User");

export class User {
  public [symbol]: typeof symbol = symbol;
  private readonly userId: UserId;
  private readonly auth: UserAuth;

  constructor(userId: UserId, auth: UserAuth) {
    this.userId = userId;
    this.auth = auth;
  }

  public static create(auth: UserAuth): User {
    return new User(UserId.create(), auth);
  }

  toJSON() {
    return {
      id: this.userId.toJSON(),
      auth: this.auth.toJSON(),
    };
  }
}
