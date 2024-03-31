import { type UserAuth, UserId } from "@/api/lib/domain";

const symbol = Symbol("User");

export class User {
  public [symbol]: typeof symbol = symbol;
  constructor(readonly userId: UserId, readonly auth: UserAuth) {}

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
