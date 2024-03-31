import type { GoogleAuth } from "@/api/lib/domain";

const symbol = Symbol("UserAuth");
export class UserAuth {
  public readonly [symbol]: typeof symbol = symbol;
  readonly google?: GoogleAuth;
  constructor({ google }: { readonly google?: GoogleAuth }) {
    this.google = google;
    this.validate();
  }

  private validate() {
    if (!this.google) {
      throw new Error("At least one auth method is required");
    }
  }

  toJSON() {
    return {
      google: this.google?.toJSON(),
    };
  }
}
