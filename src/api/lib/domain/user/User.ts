import { GoogleAuth } from "@/api/lib/domain/user/auth/GoogleAuth";
import { UserAuth } from "@/api/lib/domain/user/auth/UserAuth";
import { UserId } from "@/api/lib/domain/user/UserId";

const symbol = Symbol("User");

export class User {
  public [symbol]: typeof symbol = symbol;
  private readonly userId: UserId;
  private readonly auth: UserAuth;

  constructor(userId: UserId, auth: UserAuth) {
    this.userId = userId;
    this.auth = auth;
  }

  toJSON() {
    return {
      userId: this.userId.toJSON(),
      auth: this.auth.toJSON(),
    };
  }
}
