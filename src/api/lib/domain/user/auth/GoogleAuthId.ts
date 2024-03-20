const symbol = Symbol("GoogleAuthId");

export class GoogleAuthId {
  public readonly [symbol]: typeof symbol = symbol;
  private readonly value: string;
  constructor(value: string) {
    if (value.length === 0) {
      throw new Error("GoogleAuthId cannot be empty");
    }
    this.value = value;
  }

  toJSON() {
    return this.value;
  }
}
