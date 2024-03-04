const symbol = Symbol("GoogleAuth");

export class GoogleAuth {
  public readonly [symbol]: typeof symbol = symbol;
  private readonly id: string;
  constructor(id: string) {
    if (id.length === 0) {
      throw new Error("GoogleUid cannot be empty");
    }
    this.id = id;
  }

  toJSON() {
    return { id: this.id };
  }
}
