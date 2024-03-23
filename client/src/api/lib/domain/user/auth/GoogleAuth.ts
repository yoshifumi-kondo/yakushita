import type { GoogleAuthId } from "@/api/lib/domain/user/auth/GoogleAuthId";

const symbol = Symbol("GoogleAuth");

export class GoogleAuth {
  public readonly [symbol]: typeof symbol = symbol;
  private readonly id: GoogleAuthId;
  constructor(id: GoogleAuthId) {
    this.id = id;
  }

  toJSON() {
    return { id: this.id.toJSON() };
  }
}
