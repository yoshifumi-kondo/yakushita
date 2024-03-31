import type { GoogleAuthId } from "@/api/lib/domain/user/auth/GoogleAuthId";

const symbol = Symbol("GoogleAuth");

export class GoogleAuth {
  public readonly [symbol]: typeof symbol = symbol;
  constructor(readonly id: GoogleAuthId) {}

  toJSON() {
    return { id: this.id.toJSON() };
  }
}
