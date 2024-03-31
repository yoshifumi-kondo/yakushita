const symbol = Symbol("GoogleAuthId");

export class GoogleAuthId {
  public readonly [symbol]: typeof symbol = symbol;
  constructor(readonly value: string) {
    this.validate();
  }
  validate() {
    if (this.isEmpty()) {
      throw new Error("GoogleAuthId cannot be empty");
    }
  }
  isEmpty() {
    return this.value.trim() === "";
  }
  toJSON() {
    return this.value;
  }
}
